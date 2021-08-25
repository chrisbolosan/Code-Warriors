import socket from "socket.io-client"

const clientSocket = socket(window.location.origin)

clientSocket.on("connect", async () => {
  await console.log("Connected to server")
})

export default clientSocket
