const express = require("express");
const app = express();
const userRoutes = require("./routes/UserRoutes");
const cors = require("cors");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use("/user", userRoutes);

const rooms = ['Genral', 'Footbal', 'Gaming', 'Music'];

const server = require("http").createServer(app);
require("./connection")
const PORT = 5000;
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});


function getLastMessage (room) {
    let room
}
app.get("/rooms", (req, res) => { res.json(rooms); });

io.on('connection', (socket) => {
    socket.on('join-room', async (room) => {
        socket.join(room)
    })
})
server.listen(PORT, () => console.log("Started"));