import http from "http";
import fs, { write } from "fs";
import { v4 } from "uuid";
import { Transform } from "stream";

// Log Analyzer
const app = http.createServer((req, res) => {
  if (req.method == "POST" && req.url == "/upload") {
    if (req.headers["content-type"] !== "text/plain") {
      res.writeHead(400);
      return res.end("Only log files allowed");
    }
    let id = v4();
    let size = 0;
    let totalChunks = 0;
    let fileSize = req.headers["content-length"];
    const writeFile = fs.createWriteStream(`./uploads/${id}.log`);
    const progressTrack = new Transform({
      transform(chunk, encoding, callback) {
        size = size + chunk.length;
        totalChunks += 1;
        callback(null, chunk);
      },
    });
    let interval = null;
    req.pipe(progressTrack).pipe(writeFile);
    const started = () => {
      interval = setInterval(() => {
        console.log(
          `Received ${(size / 1024 / 1024).toFixed(2)} of ${(fileSize / 1024 / 1024).toFixed(2)}`,
        );
      }, 1000);
    };

    started();

    const complete = () => {
      clearInterval(interval);
      console.log(
        `Total Received File Size ${(size / 1024 / 1024).toFixed(2)}`,
      );
      console.log(`Total Chunks ${totalChunks}`);
    };

    writeFile.on("finish", () => {
      console.log("Log File Uploaded");
      complete();
      writeFile.end();
      res.end(
        JSON.stringify({
          Uplaoded: true,
          id: id,
        }),
      );
    });

    writeFile.on("error", () => {
      console.log("Error Occured");
      fs.rm(`./uploads/${id}.log`, () => {});
      complete();
      writeFile.end();
      res.end("Error Uploading File");
    });

    req.on("aborted", () => {
      complete();
      fs.rm(`./uploads/${id}.log`, () => {});
      console.log("Upload Aborted, File Removed");
    });
  } else {
    res.statusCode = 404;
    res.end("Route Not Found");
  }
});

app.listen(3000, () => {
  console.log("Server running on Port 3000");
});
