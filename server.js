const express = require("express");
const cors = require("cors");
const ytdlp = require("yt-dlp-exec");
const fs = require("fs");
const path = require("path");
const ffmpegPath = require("ffmpeg-static");
const compression = require("compression");
const Razorpay = require("razorpay");

const app = express();
const PORT = process.env.PORT || 5001;

/* =========================
   RAZORPAY SETUP
   Set these in your .env file:
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
========================= */

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_YOUR_KEY_ID",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "YOUR_KEY_SECRET",
});

/* =========================
   PERFORMANCE MIDDLEWARE
========================= */

// Gzip/Brotli compress all responses
app.use(compression({ level: 6 }));

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   IN-MEMORY INFO CACHE
   (avoids re-fetching same URL within 10 min)
========================= */

const cache = new Map();
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

function getCached(url) {
  const entry = cache.get(url);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL_MS) { cache.delete(url); return null; }
  return entry.data;
}

function setCache(url, data) {
  // Keep cache from growing unbounded
  if (cache.size > 200) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }
  cache.set(url, { data, ts: Date.now() });
}

/* =========================
   TEST ROUTE
========================= */

app.get("/", (req, res) => {
  res.send("VidSnap backend running ✅");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

/* =========================
   CREATE RAZORPAY ORDER
========================= */

app.post("/api/create-order", async (req, res) => {
  const { amount, currency = "INR" } = req.body;

  if (!amount || isNaN(amount) || amount < 1) {
    return res.status(400).json({ error: "Valid amount is required" });
  }

  try {
    const order = await razorpay.orders.create({
      amount: Math.round(amount) * 100, // Razorpay uses paise (1 INR = 100 paise)
      currency,
      receipt: `receipt_${Date.now()}`,
      notes: { source: "VidSnap Website" },
    });

    res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_YOUR_KEY_ID",
    });
  } catch (err) {
    console.error("RAZORPAY ORDER ERROR:", err);
    res.status(500).json({ error: "Could not create payment order. Check your Razorpay API keys." });
  }
});

/* =========================
   GET VIDEO INFO  (with cache)
========================= */

app.post("/api/info", async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: "URL required" });

  // Serve from cache if fresh
  const cached = getCached(url);
  if (cached) {
    res.setHeader("X-Cache", "HIT");
    return res.json(cached);
  }

  try {
    const info = await ytdlp(url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCheckCertificates: true,
      socketTimeout: 20,
      addHeader: [
        "referer:youtube.com",
        "user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      ]
    });

    const formats = info.formats
      .filter(f => f.height && f.vcodec !== "none")
      .map(f => ({ height: f.height, ext: f.ext }));

    const result = {
      title: info.title,
      thumbnail: info.thumbnail,
      duration: info.duration,
      duration_string: info.duration_string,
      platform: info.extractor_key || "Video",
      formats
    };

    setCache(url, result);
    res.setHeader("X-Cache", "MISS");
    res.json(result);

  } catch (err) {
    console.error("INFO ERROR:", err.stderr || err);
    const message = err.stderr ? err.stderr.split('\n')[0] : "Failed to fetch video info";
    res.status(500).json({ error: message });
  }
});

/* =========================
   DOWNLOAD VIDEO
========================= */

app.post("/api/download", async (req, res) => {
  const { url, format } = req.body;

  if (!url || !format) {
    return res.status(400).json({ error: "URL and format required" });
  }

  const isAudio = format === "audio";
  const height = isAudio ? null : format.replace("p", "");

  const ext = isAudio ? "m4a" : "mp4";
  const filename = `vidsnap_${Date.now()}.${ext}`;

  try {
    // We can immediately set headers to start the download on the client side
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", isAudio ? "audio/mp4" : "video/mp4");
    res.setHeader("Cache-Control", "no-store");

    const subprocess = ytdlp.exec(url, {
      f: isAudio 
        ? "bestaudio[ext=m4a]/bestaudio" 
        : `bestvideo[height<=${height}]+bestaudio/best[height<=${height}]/best`,
      ...(isAudio ? {} : { mergeOutputFormat: "mp4" }),
      ffmpegLocation: ffmpegPath,
      o: "-", // output to stdout
      socketTimeout: 30,
      addHeader: [
        "referer:youtube.com",
        "user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      ]
    });

    subprocess.stdout.pipe(res);
    
    let errorLog = "";
    subprocess.stderr.on("data", (chunk) => {
      errorLog += chunk.toString();
    });

    subprocess.on("close", (code) => {
      if (code !== 0 && !res.headersSent) {
        console.error("YTDLP Stream Error:", errorLog);
      }
    });

    // Terminate ytdlp if the client cancels the download / connection drops
    req.on("close", () => {
      if (subprocess && subprocess.pid) {
        try {
          subprocess.kill("SIGKILL");
        } catch (e) {
          // Ignore kill error
        }
      }
    });

  } catch (err) {
    console.error("DOWNLOAD ERROR:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Download failed. The video might be unavailable or region-locked." });
    } else {
      res.end(); // End the response if headers were already sent to prevent hanging
    }
  }
});

/* =========================
   SERVE FRONTEND (Production)
========================= */

// Cache static assets aggressively
app.use(
  express.static(path.join(__dirname, "frontend", "dist"), {
    maxAge: "7d",
    etag: true,
    lastModified: true,
  })
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {
  console.log(`✅ VidSnap server running on port ${PORT}`);
});