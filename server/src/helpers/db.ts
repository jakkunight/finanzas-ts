import mysql2 from "mysql2/promise"
import { config } from "dotenv"

config()

const pool = mysql2.createPool({
	database: process.env.DB || "finanzas_ts",
	host: process.env.DB_HOST || "127.0.0.1",
	port: Number(process.env.DB_PORT) || 3306,
	user: process.env.DB_USER || "user",
	password: process.env.DB_PASSWORD || "password"
})
async function connect(){
	try{
		if(!pool){
			throw new Error("[ERROR] Couldn't stablish a connection with the database server.")
		}
		if(!(await pool.getConnection())){
			throw new Error("[ERROR] Couldn't stablish a connection with the database server.")
		}
		console.log("[SUCCESS] DATABASE is ONLINE!!!")
	}catch(e:any){
		throw new Error(e)
	}
}
connect()

export default pool
