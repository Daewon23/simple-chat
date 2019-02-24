const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

http.listen(7070, () => {
  console.log("App listening on 3000");
});

var users = [];
var connections = [];

io.sockets.on("connection", socket => {
  console.log("Connected!");

  connections.push(socket);
  socket.on("disconnect", data => {
    connections.splice(connections.indexOf(socket), 1);
    console.log("Disconnected!");
  });

  socket.on("send mess", data => {
    io.sockets.emit("add mess", { mess: data.mess, name: data.name});
  });
});
