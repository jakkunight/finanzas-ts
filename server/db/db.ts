import { createPool, Pool } from "mysql2/promise";
//import { host, user, password } from "../.keys.json";

let host: string;
let user: string;
let password: string;

const connect = async (): Promise<Pool> => {
	const pool = await createPool({
		host: host || "127.0.0.1",
		port: 3306,
		connectionLimit: 10,
		database: "finanzas_ts",
		//ssl: {
		//	rejectUnauthorized: true
		//},
		user: user || "root",
		password: password || "karneval"
	});
	if(pool){
		console.log("[INFO] Base de Datos ONLINE.");
		return pool;
	}else{
		console.error("[ERROR] Base de Datos OFFLINE.");
		throw new Error("Fallo al conectar con el servidor de Base de Datos. Abortando...");
	}
};

export default connect;
