const fs = require('fs');
const ytdlp = require("yt-dlp-exec");

async function run() {
  try {
    const info = await ytdlp("https://www.youtube.com/watch?v=jNQXAC9IVRw", {
      dumpSingleJson: true,
      noWarnings: true,
      noCheckCertificates: true,
      socketTimeout: 15,
      addHeader: [
        "referer:youtube.com",
        "user-agent:Mozilla/5.0"
      ]
    });
    fs.writeFileSync('output.txt', "SUCCESS: " + info.title);
  } catch (err) {
    fs.writeFileSync('output.txt', "ERROR:\n" + (err.stderr || err.message || JSON.stringify(err)));
  }
}
run();
