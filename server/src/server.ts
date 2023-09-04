import express, { Application } from "express"
import cors, { CorsOptions } from "cors"
import pool from "./helpers/db"
import { RowDataPacket } from "mysql2"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import fileupload from "express-fileupload"
import passport from "passport"
import "./helpers/passport"

import auth from "./routes/auth"

class Server {
	server:Application
	port:number|string
	corsOptions:CorsOptions
	router(){
		
	}
	middlewares(){
		this.server.use((req, res, next) => {
			console.log(`[${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()} ${new Date().getHours().toString()}:${new Date().getMinutes().toString()}:${new Date().getSeconds().toString()}]`)
			console.log("-------- Request Data --------")
			console.log("[INFO] METHOD:", req.method)
			console.log("[INFO] URI:", req.url)
			console.log("-------- Client Data --------")
			console.log("[INFO] Client IP:", req.ip)
			console.log("[INFO] Client origin:", req.headers.origin)
			console.log("[INFO] Client location:", req.headers.location)
			console.log("[INFO] Client allowed origin:", req.headers["access-control-allow-origin"])
			return next()
		})
		this.server.use(cors(this.corsOptions))
		this.server.use(cookieParser())
		this.server.use(fileupload())
		this.server.use(bodyParser.json())
		this.server.use("/auth", auth)
		this.server.use(passport.authenticate("jwt", { session: false }))
		this.server.use((req, res, next) => {
			console.log(`[${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()} ${new Date().getHours().toString()}:${new Date().getMinutes().toString()}:${new Date().getSeconds().toString()}]`)
			console.log("-------- Request Data --------")
			console.log("[INFO] Body:", req.body)
			console.log("[INFO] METHOD:", req.method)
			console.log("[INFO] URI:", req.url)
			console.log("-------- Client Data --------")
			console.log("[INFO] Client IP:", req.ip)
			console.log("[INFO] Client origin:", req.headers.origin)
			console.log("[INFO] Client location:", req.headers.location)
			console.log("[INFO] Client allowed origin:", req.headers["access-control-allow-origin"])
			console.log("-------- User Data --------")
			console.log("[INFO] User:", req.user)
			return next()
		})
	}
	listen(){
		this.server.listen(this.port, () => {
			console.log("[INFO] Server on port", this.port)
			
		})
	}
	constructor(port:number|string){
		this.port = port
		this.server = express()
		this.corsOptions = {
			credentials: true,
			optionsSuccessStatus: 204,
			preflightContinue: true,
			origin: async (requestOrigin, callback) => {
				try{
					if(!requestOrigin){
						return callback(null, true)
					}
					if(requestOrigin.startsWith("http://localhost") || requestOrigin.startsWith("http://127.0.0.1")){
						return callback(null, true)
					}
					if(requestOrigin.startsWith("https://localhost") || requestOrigin.startsWith("https://127.0.0.1")){
						return callback(null, true)
					}
					const origins = (await pool.query("SELECT devices FROM users"))[0] as RowDataPacket|RowDataPacket[]
					const allowedOrigins = origins.map((element:{ devices:string }) => element.devices) as string[]
					if(allowedOrigins.includes(requestOrigin)){
						return callback(null, true)
					}
					return callback(new Error("[ERROR] Request DENIED. 'origin' not allowed by CORS."))
				}catch(err){
					console.error(err);
					throw new Error("[ERROR] Request not allowed by CORS-Policy")
				}
			},
		}
		this.server.set("port", this.port)
		this.middlewares()
		this.router()
	}
}

export default Server