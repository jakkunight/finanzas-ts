import express, { Application } from "express";
import fileupload from "express-fileupload";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import gastos from "./routes/gastos";

class Server {
	private server: Application;
	private corsOptions: Object;
	private setup = () => {
		this.server.set("port", process.env.PORT || this.puerto || 3000);
		this.corsOptions = {
			origin: [
				"localhost",
				"127.0.0.1",
				"jakkunight.github.io"
			],
			optionsSuccessStatus: 204, // para usuarios de Internet Explorer
			preflightContinue: true,
			credentials: true,
			allowedHeaders: [
				"Content-Type",
				"Authorization"
			]
		};
	};
	private middlewares = () => {
		this.server.use(fileupload());
		this.server.use(bodyParser.urlencoded({extended: true}));
		this.server.use(bodyParser.json());
		this.server.use(cookieParser());
		this.server.use(cors(this.corsOptions));
	};
	private routes = () => {
		this.server.use(gastos);
	};
	listen = () => {
		this.server.listen(this.server.get("port"), () => {
			console.log("[INFO] Servidor en el puerto", this.server.get("port"));
		});
	};
	constructor(private puerto?: number | string){
		this.server = express();
		this.corsOptions = {};
		this.setup();
		this.middlewares();
		this.routes();
	}
};

export default Server;
