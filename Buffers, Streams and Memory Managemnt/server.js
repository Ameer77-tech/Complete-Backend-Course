import http from "http";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { Transform } from "stream";

// Practice 1

// const server = http.createServer((req, res) => {
//   if (req.method == "POST" && req.url == "/upload") {
//     // on method POST and /upload url
//     const file = fs.createWriteStream("./video.mp4");
//     let interval = null; // Create writableStream with destination
//     started();
//     let uploaded = 0; // to track upload progress
//     let totalChunks = 0;
//     const totalBytes = Number(req.headers["content-length"]); // total File Length
//     req.on("data", (chunk) => {
//       // On receiving chunks of file from user/client etc
//       totalChunks = totalChunks + 1;
//       uploaded = uploaded + chunk.length;
//       file.write(chunk);
//     });
//     function started() {
//       // to Show Upload Progress every 1 seconds in console
//       console.log("Upload Started");
//       interval = setInterval(() => {
//         console.log(
//           `Uploaded ${(uploaded / 1024 / 1024).toFixed(2)} MB / ${(totalBytes / 1024 / 1024).toFixed(2)} MB`,
//         );
//       }, 1000);
//     }

//     function stopUpload() {
//       // to stop showing upload progress
//       clearInterval(interval);
//       file.end();
//     }
//     req.on("end", () => {
//       // On complete file received
//       stopUpload();
//       res.end("Uploaded");
//     });
//     req.on("close", () => {
//       console.log(
//         `Uploaded ${(uploaded / 1024 / 1024).toFixed(2)} MB / ${(totalBytes / 1024 / 1024).toFixed(2)} MB`,
//       );
//       console.log(`Total Chunks ${totalChunks}`);
//       console.log(`Total Bytes ${uploaded}`);
//       console.log(`Chunk Size ${uploaded / totalChunks}`);

//       console.log("Connection closed");
//       stopUpload();
//     });

//     req.on("aborted", () => {
//       // Cancelled by user/client
//       console.log("Upload aborted");
//       stopUpload();
//     });
//   }
// });

// server.listen(3000, () => console.log("Running"));

// Upload file

const app = http.createServer((req, res) => {
  if (req.method == "POST" && req.url == "/upload") {
    let size = 0;
    let totalChunks = 0;
    let interval = null;
    let totalFileSize = Number(req.headers["content-length"]);

    console.log("Upload Started");
    console.log(
      `Received ${(size / 1024 / 1024).toFixed(2)} MB of ${totalFileSize / 1024 / 1024} MB`,
    );
    const id = uuidv4();
    const writeFile = fs.createWriteStream(`./uploads/${id}.mp4`);
    const progressTrack = new Transform({
      transform(chunk, encoding, callback) {
        size = size + chunk.length;
        totalChunks += 1;
        callback(null, chunk);
      },
    });
    req.pipe(progressTrack).pipe(writeFile);
    const uploadStarted = () => {
      interval = setInterval(() => {
        console.log(
          `Received ${(size / 1024 / 1024).toFixed(2)} MB of ${totalFileSize / 1024 / 1024} MB`,
        );
        console.log(`Percent ${((size / totalFileSize) * 100).toFixed(2)}`);
      }, 1000);
    };
    uploadStarted();

    const stopUpload = () => {
      clearInterval(interval);
      console.log(
        `Received ${(size / 1024 / 1024).toFixed(2)} MB of ${totalFileSize / 1024 / 1024} MB`,
      );
      console.log(`Chunks Received ${totalChunks}`);
      console.log(`Total Bytes Received ${size}`);
      console.log("Upload Complete");
    };

    writeFile.on("finish", () => {
      stopUpload();
      res.end(JSON.stringify({ Uploaded: true, VideoId: id }));
    });

    req.on("aborted", () => {
      clearInterval(interval);
      fs.rm(`./uploads/${id}.mp4`, () => console.log("File Deleted"));
      console.log("Upload Cancelled");
    });
  }
});

app.listen(3000, () => console.log("Running"));
