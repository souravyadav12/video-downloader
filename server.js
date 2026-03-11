const express = require("express");
const cors = require("cors");
const ytdlp = require("yt-dlp-exec").create();
const fs = require("fs");
const path = require("path");
const ffmpegPath = require("ffmpeg-static");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*", // Or restrict to your Vercel/Netlify domain if preferred
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

/* =========================
   GET VIDEO INFO
========================= */

app.post("/api/info", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL required" });
  }

  try {
    const info = await ytdlp(url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCheckCertificate: true,
      socketTimeout: 15,
      addHeader: [
        "referer:youtube.com",
        "user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      ]
    });

    const formats = info.formats
      .filter(f => f.height && f.vcodec !== "none")
      .map(f => ({
        height: f.height,
        ext: f.ext
      }));

    res.json({
      title: info.title,
      thumbnail: info.thumbnail,
      duration: info.duration,
      duration_string: info.duration_string,
      formats
    });

  } catch (err) {
    console.error("INFO ERROR:", err.stderr || err);

    res.status(500).json({
      error: "Failed to fetch video info"
    });
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

  try {

    const height = format.replace("p", "");

    const filename = `video_${Date.now()}.mp4`;
    const filepath = path.join(__dirname, filename);

    await ytdlp(url, {
      f: `bestvideo[height<=${height}]+bestaudio/best`,
      mergeOutputFormat: "mp4",
      ffmpegLocation: ffmpegPath,
      o: filepath,
      socketTimeout: 15,
      addHeader: [
        "referer:youtube.com",
        "user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      ]
    });

    res.download(filepath, filename, () => {
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    });

  } catch (err) {
    console.error("DOWNLOAD ERROR:", err.stderr || err);

    res.status(500).json({
      error: "Download failed"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});