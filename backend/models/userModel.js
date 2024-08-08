import pool from '../config/db.js' //aqui llamo a la bd

const addUser = async({email, password, rol, lenguage}) => {
    try {
        const sql = 'INSERT INTO usuarios (email, password, rol, lenguage) values ($1, $2, $3, $4) returning *',
        values =[email, password, rol, lenguage]

        const result = await pool.query(sql, values)
        if(result.rowCount > 0) {
            return result.rows
        } else {
            return false
        }

    } catch (error) {
        console.log('Error', error.message)
    }
}

export const model = {
    addUser
}
