import pool from "../db"
import { RowDataPacket, SQLCondition, SQLKey, SQLOrder, SQLTable } from "./types"

const readTable = async ({
	table,
	filter,
	keys,
	sort
}:{
	table:SQLTable,
	keys?:SQLKey[],
	filter?:SQLCondition[],
	sort?:SQLOrder
}):Promise<RowDataPacket[]> => {
	try{
		if(typeof table === "string"){
			
		}
		let time = performance.now()
		const result = (await pool.query(
			`SELECT FROM WHERE ORDER BY `
		))[0] as RowDataPacket[]
		time = performance.now() - time
		console.log(`[SUCCESS] Read ${result.length} rows in ${time.toFixed(3)}ms`)
		return result
	}catch(err){
		console.log(err)
		throw new Error("[ERROR] Fatal ERROR")
	}
}

export default readTable