### SIMPLE HTTP SERVER WITH NATIVE NODE JS WHICH CHECKS HEALTH OF SERVER AND RETURN 404 ON UNIDENTIFIED ROOT

### STEP 1
-> Create a Folder (ex.Simple Node.js Http Server)
-> Go Inside the Folder, Enter npm init -y to initialize package.json in the folder
-> make sure to create a .js file where the http server's code is written
-> write code to handle request and response and unknown routes

### Methods to remember 

-> http.createServer(Callaback function) to create a server
-> req.url to get url, req.method to know type of method
-> res.statusCode = 200, 404 etc to set code
-> res.end to send response and stop
-> server.listen() to start the server

### Result

-> GO to postman or browser
-> hit localhost:3000 or any port number
-> should show server running
-> try other routes
-> should show 404 route not found
-> change method from get to post or any other
-> should show 404 route not found