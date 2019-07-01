const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

const port = process.env.PORT || 9002;

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

io.on("connection", (client) => {
    console.log("Connected");
    client.emit("acknowledge", { message: "Connection established" })

    client.on("MsgToServer", (chatterName,message) => {
        console.log(chatterName+" says : " + message);
        client.emit("MsgToClient",'Me', message);
    client.broadcast.emit("MsgToClient",chatterName,message);
})
})

server.listen(port, () => {
    console.log("Socket server started at :" + port);
})




