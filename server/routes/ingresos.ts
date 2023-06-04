import { Request, Response, Router } from "express";
import connect from "../db/db";

const router = Router();
router.get("/ingresos", async (req:Request, res:Response):Promise<Response<any>> => {
	try{
		const connection = await connect();
		const result = await connection.query("SELECT * FROM ingresos");
		return res.json(JSON.stringify(result[0]));
	}catch(e){
		console.log(e);
		return res.sendStatus(400);
	}
});

router.post("/ingresos", async (req:Request, res:Response):Promise<Response<any>> => {
	try{
		const connection = await connect();
		const result = await connection.query("INSERT INTO ingresos SET ?", [req.body]);
		return res.sendStatus(200);
	}catch(e){
		console.log(e);
		return res.sendStatus(400);
	}
});

router.put("/ingresos", async (req:Request, res:Response):Promise<Response<any>> => {
	try{
		const connection = await connect();
		const result = await connection.query("UPDATE ingresos SET ? WHERE id = ?", [req.body, req.body.id]);
		return res.sendStatus(200);
	}catch(e){
		console.log(e);
		return res.sendStatus(400);
	}
});

router.delete("/ingresos", async (req:Request, res:Response):Promise<Response<any>> => {
	try{
		const connection = await connect();
		const result = await connection.query("DELETE FROM ingresos WHERE id = ?", [req.body.id]);
		return res.sendStatus(200);
	}catch(e){
		console.log(e);
		return res.sendStatus(400);
	}
});


export default router;
