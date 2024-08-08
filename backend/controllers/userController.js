import { model } from "../models/userModel.js"

const home = (req,res) => {
    res.send('Pagina home') 
}

const notFound = (req, res) => {
    res.send('404 - pagina no existe')
}

const registro = async (req, res) => {
    const {email, password, rol, lenguage} = req.body
    const result = await model.addUser({ email, password, rol, lenguage})
    res.send('usuario creado satisfactoriamente')
}

export const controller = {
    home,
    notFound, 
    registro
}