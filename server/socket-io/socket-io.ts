import { Server } from "socket.io"




export default function createSocketIoConnection(server) {
    console.log(1)
    const io = new Server(server)

    io.on("connection", (socket) => onConnection(socket))

    return io


    async function onConnection(socket) {
        console.log("connected")

        socket.on("Ping", () => {
            socket.emit("Pong")
        })

        socket.on("disconnect", () => onDisconnect())


        async function onDisconnect() {

        }
    }


}