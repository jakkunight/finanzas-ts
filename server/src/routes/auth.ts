import { Router } from "express"
import passport from "passport"
import jwt from "jsonwebtoken"
import { config } from "dotenv"
import pool from "../helpers/db"
import { ResultSetHeader, RowDataPacket } from "mysql2"
import { genSalt, hash } from "bcryptjs"

config()

const router = Router()

router.post("/login", passport.authenticate("local", { session: false }), async (req, res) => {
    try{
        if(!req.user){
            console.log("[ERROR] User is not authenticated.");
            return res.sendStatus(204);
        }
        if(req.headers.authorization &&
        !req.headers.authorization.match(/bearer\sundefined(.+)/i) &&
        req.headers.authorization.match(/bearer\s(.+)/i)){
            console.log("[ERROR] User id already logged in!")
            return res.sendStatus(204);
        }
        const token = jwt.sign(req.user, process.env.JWT_SECRET || "keyboard cat", {
            expiresIn: "1 days"
        });

        return res.json(JSON.stringify({
			token
		}));
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
})

router.post("/signin", async (req, res) => {
	try{
		if(req.user || !req.body){
			console.log("[ERROR] User logged in or no user to sign in.")
			return res.sendStatus(400)
		}
		const counter = ((await pool.query(
			"SELECT COUNT(*) AS counter FROM users WHERE email = ?",
			[req.body.email]
		))[0] as RowDataPacket|RowDataPacket[])[0].counter
		if(counter != 0){
			console.log("[ERROR] Email already taken.")
			return res.sendStatus(400)
		}
		const { name, email, password } = req.body
		let userData = {
			name,
			email,
			password: (await hash(password, (await genSalt(10)))),
			devices: req.headers.origin || req.headers["access-control-allow-origin"]
		}
		const result = (await pool.query("INSERT INTO users SET ?", [userData]))[0] as ResultSetHeader
		console.log(result)
		return res.sendStatus(200)
	}catch(err){
		console.log(err)
		return res.sendStatus(500)
	}
})

export default router