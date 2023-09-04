import Server from "./server"
import { config } from "dotenv"

config()

const server = new Server(process.env.PORT || 3000)

server.listen()