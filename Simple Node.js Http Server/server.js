import http from "http"

const server = http.createServer((req, res) => {
    if(req.url == "/" && req.method == "GET"){ // on http://localhost:3000 and method GET
        return res.end("Server Running")
    }
    if(req.url == "/health" && req.method == "GET"){ // on http://localhost:3000/health and method GET
       return res.end("Healthy")
    }
    res.statusCode = 404
   return res.end("404 Route Not Found") // on not!! http://localhost:3000 nor!! http://localhost:3000/health and method not!! GET
})


server.listen(3000, ()=>{
    console.log("Server Running on Port 3000");
})
