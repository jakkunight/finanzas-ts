import { RowDataPacket, ResultSetHeader } from "mysql2"

type SQLKey = string|{
	table:string,
	key:string
}

type SQLJoinTable = {
	table:string,
	joinType:"INNER"|"FULL"|"FULL OUTER"|"RIGHT"|"LEFT",
	joinCondition:{
		column1:SQLKey,
		column2:SQLKey
	}
}

type SQLTable = string|{
	mainTable:string,
	joinedTables:SQLJoinTable[]
}

type SQLCondition = {
	not?:"NOT"
	value1:SQLKey,
	operator:"<"|">"|"<="|">="|"="|"!="|"LIKE"|"NOT LIKE",
	value2:SQLKey|string|number,
	separator?:"AND"|"OR"
}

type SQLOrder = {
	columns:SQLKey[],
	way:"ASC"|"DESC"
}

export {
	RowDataPacket,
	ResultSetHeader,
	SQLCondition,
	SQLJoinTable,
	SQLKey,
	SQLOrder,
	SQLTable
}