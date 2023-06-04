import { Request, Response, Router } from "express";
import connect from "../db/db";

const router = Router();
router.get("/gastos", async (req:Request, res:Response):Promise<Response<any>> => {
	try{
		const connection = await connect();
		const result = await connection.query("SELECT * FROM gastos");
		return res.json(JSON.stringify(result[0]));
	}catch(e){
		console.log(e);
		return res.sendStatus(400);
	}
});

router.post("/gastos", async (req:Request, res:Response):Promise<Response<any>> => {
	try{
		const connection = await connect();
		const result = await connection.query("INSERT INTO gastos SET ?", [req.body]);
		return res.sendStatus(200);
	}catch(e){
		console.log(e);
		return res.sendStatus(400);
	}
});

router.put("/gastos", async (req:Request, res:Response):Promise<Response<any>> => {
	try{
		const connection = await connect();
		const result = await connection.query("UPDATE gastos SET ? WHERE id = ?", [req.body, req.body.id]);
		return res.sendStatus(200);
	}catch(e){
		console.log(e);
		return res.sendStatus(400);
	}
});

router.delete("/gastos", async (req:Request, res:Response):Promise<Response<any>> => {
	try{
		const connection = await connect();
		const result = await connection.query("DELETE FROM gastos WHERE id = ?", [req.body.id]);
		return res.sendStatus(200);
	}catch(e){
		console.log(e);
		return res.sendStatus(400);
	}
});


export default router;
