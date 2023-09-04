import pool from "../db"
import { RowDataPacket, SQLCondition, SQLOrder } from "./types"

const findRow = async ({
	conditions,
	table,
	keys,
	sort
}:{
	table:string,
	conditions:SQLCondition[],
	keys?:string[],
	sort?:SQLOrder,
}):Promise<RowDataPacket[]> => {
	try{
		const conds = conditions.map(({ key, operator, value, separator }, i) => {
			if(!separator){
				separator = " "
			}
			if(separator === " " && i != conditions.length - 1){
				throw new Error(
					`[ERROR] Could not preprocess condition ${i}.\n[ERROR] No valid separator found ("AND"/"OR").`
				)
			}
			if((separator === "OR" || separator === "AND") && i == conditions.length - 1){
				throw new Error(
					`[ERROR] Could not preprocess condition ${i}.\n[ERROR] No valid separator found (""/" ").`
				)
			}
			return `${key.key} ${operator} '${value}' ${separator}`
		})
		if(!sort){
			sort = {
				keys: [
					{
						key: "id"
					}
				],
				way: "ASC"
			}
		}
		if(!keys){
			keys = [ "*" ]
		}
		let aux = sort.keys.map(({ key, table }) => {
			if(table){
				return `${table}.${key}`
			}
			return `${key}`
		});
		let time = performance.now()
		const result = (
			await pool.query(
				`SELECT ${keys.join(", ")} FROM ${table} WHERE ${conds.join(" ")} ORDER BY ${aux.join(", ")} ${sort.way}`
		))[0] as RowDataPacket[]
		time = performance.now() - time
		console.log(`[SUCCESS] Read ${result.length} rows in ${time.toFixed(3)}ms`)
		return result
	}catch(err){
		console.log(err)
		throw new Error("[ERROR] Fatal ERROR")
	}
}

export default findRow