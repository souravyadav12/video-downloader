const express = require('express');
const cors = require('cors');
const { execSync } = require('child_process');
const ytdlp = require('yt-dlp-exec').create();
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Auto-install ffmpeg-static if missing so 1080p merge works flawlessly!
// let ffmpegPath;
// try {
//     ffmpegPath = require('ffmpeg-static');
// } catch (e) {
//     console.log('Installing ffmpeg-static for high-quality video merging...');
//     execSync('npm install ffmpeg-static', { stdio: 'inherit', cwd: __dirname });
//     ffmpegPath = require('ffmpeg-static');
// }
try {
  execSync("yt-dlp --version", { stdio: "ignore" });
} catch {
  console.log("Installing yt-dlp...");
  execSync("pip install -U yt-dlp", { stdio: "inherit" });
}



const ffmpegPath = require("ffmpeg-static");

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(cors());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Important for form submits!

// Main health check route
app.get('/', (req, res) => {
    res.send('Video Downloader Backend is running successfully!');
});

// Helper function to extract info
app.post('/api/info', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // const info = await ytdlp(url, {
        //     dumpJson: true,
        //     noWarnings: true,
        //     noCallHome: true,
        //     noCheckCertificate: true,
        // });
        const info = await ytdlp(url, {
            dumpSingleJson: true,
            noWarnings: true,
            noCheckCertificate: true,
            preferFreeFormats: true
        });


        

        // Determine platform
        let platform = 'Unknown';
        if (url.includes('youtube.com') || url.includes('youtu.be')) platform = 'YouTube';
        else if (url.includes('instagram.com')) platform = 'Instagram';

        res.json({
            title: info.title,
            thumbnail: info.thumbnail,
            duration: info.duration,
            duration_string: info.duration_string,
            platform,
            format_note: info.format_note,
            extractor: info.extractor,
            formats: info.formats.map(f => ({
                height: f.height,
                ext: f.ext,
                vcodec: f.vcodec,
                format_note: f.format_note
            }))
        });
    } 
   catch (error) {
    console.error("YT-DLP ERROR:", error.stderr || error);
    res.status(500).json({
        error: "Server failed to fetch video information"
    });
}
});

// Download endpoint
app.post('/api/download', async (req, res) => {
    const { url, format } = req.body;

    if (!url || !format) {
        return res.status(400).json({ error: 'URL and format are required' });
    }

    try {
        let formatCode = 'best';
        let ext = 'mp4';

        if (format === 'audio') {
            formatCode = 'bestaudio[ext=m4a]/bestaudio';
            ext = 'm4a';
        } else {
            // Dynamic resolution matching (e.g. format="1440")
            const height = format.replace('p', '');
            formatCode = `bestvideo[height<=${height}][ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best`;
        }

        const filename = `hq_video_${Date.now()}_${Math.floor(Math.random() * 1000)}.${ext}`;
        const filepath = path.join(__dirname, filename);

        console.log(`Starting High-Quality ${format} download... This may take a moment.`);

        // Download to disk to properly merge the high quality streams using FFmpeg
        await ytdlp(url, {
            f: formatCode,
            o: filepath,
            ffmpegLocation: ffmpegPath, // Use the bundled ffmpeg to fix merging!
            noWarnings: true
        });

        console.log('Merge complete! Sending to client...');

        // Send the real high quality file to the client browser downloader
        res.download(filepath, `video_${format}.${ext}`, (err) => {
            if (err) console.error('Error sending file to client:', err);
            // Clean up the server storage temp file
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
        });

    } 
    catch (error) {
    console.error("YT-DLP ERROR:", error.stderr || error);
    res.status(500).json({
        error: "Server failed to fetch video information"
    });
}
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
