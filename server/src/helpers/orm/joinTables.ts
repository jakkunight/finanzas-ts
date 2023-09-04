import pool from "../db"
import { RowDataPacket, SQLCondition, SQLOrder, SQLJoin, SQLTableKey } from "./types"

const joinTables = async ({
	
}:{
}):Promise<RowDataPacket[]> => {
	try{
		let time = performance.now()
		const result = (await pool.query(
			`SELECT ${columns} FROM ${table} WHERE ${conds} ORDER BY ${sort} ${way}`
		))[0] as RowDataPacket[]
		time = performance.now() - time
		console.log(`[SUCCESS] Read ${result.length} rows in ${time.toFixed(3)}ms`)
		return result
	}catch(err){
		console.log(err)
		throw new Error("[ERROR] Fatal ERROR")
	}
}

export default joinTables