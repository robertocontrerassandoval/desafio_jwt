import pool from '../config/db.js' //aqui llamo a la bd
import bcrypt from 'bcryptjs'
const addUser = async({email, password, rol, lenguage}) => {
    const hashedPassword = bcrypt.hashSync(password)
    try {
        const sql = 'INSERT INTO usuarios (email, password, rol, lenguage) values ($1, $2, $3, $4) returning *',
        values =[email, hashedPassword, rol, lenguage]

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

const buscarUsuario = async() => {
    try {
        const sql = 'SELECT * FROM usuarios WHERE id = $1',
        values = [id]   

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

const getUser = async({email, password}) => {
    try {
        const sql = 'SELECT * FROM usuarios WHERE email = $1 AND password = $2',
        values = [email, password]

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
    addUser,
    getUser,
    buscarUsuario
}
