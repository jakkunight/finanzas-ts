import passport, { DoneCallback } from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt"
import { JwtPayload } from "jsonwebtoken"
import { compare} from "bcryptjs"
import { config } from "dotenv"
import pool from "./db"
import { RowDataPacket } from "mysql2"

config()

export type User = {
	id:number|string,
	name:string,
	email:string,
	balance:number,
	currency:string
}

passport.use("local", new LocalStrategy({
	session: false,
	usernameField: "email",
	passwordField: "password"
}, async (email, password, done) => {
	try{
		const counter = ((await pool.query(
			"SELECT COUNT(*) AS counter FROM users WHERE email = ?",
			[email]
		))[0] as RowDataPacket|RowDataPacket[])[0].counter
		if(!counter){
			return done(new Error("[ERROR] User doesn't exists"), false)
		}
		const userData = (await pool.query(
			"SELECT * FROM users WHERE email = ?",
			[email]
		))[0] as RowDataPacket|RowDataPacket[]
		if(!(await compare(password, userData[0].password))){
			return done(new Error("[ERROR] Wrong password"), false)
		}
		console.log("[SUCCESS] User verified")
		return done(null, userData[0])
	}catch(err){
		return done(new Error("[ERROR] Couldn't validate user."), false)
	}
}))

passport.use("jwt", new JwtStrategy({
	secretOrKey: process.env.JWT_SECRET || "keyboard cat",
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (jwtPayload:JwtPayload, done:DoneCallback) => {
	try{
		const result = (await pool.query(
			"SELECT COUNT(*) AS counter FROM users WHERE id = ?",
			[jwtPayload.id]
		))[0] as RowDataPacket|RowDataPacket[]
		if(result[0].counter == 0){
			return done(new Error("[ERROR] Couldn't authenticate."), false)
		}
		const user = (await pool.query(
			"SELECT id, name, email, balance, currency FROM users WHERE id = ?",
			[jwtPayload.id])
		)[0] as RowDataPacket|RowDataPacket[]
		return done(null, user[0])
	}catch(err){
		console.error(err)
		return done(err, false)
	}
}))
