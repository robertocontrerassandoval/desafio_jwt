import { model } from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const { JWT_SECRET } = process.env


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

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

    //verificar que el usuario existe
    const user = await model.getUser({email, password});

    if(!user) {
        res.status(401).send('usuario no existe')
    } else {
        //generar token
        const token = jwt.sign(
            {
                email,
                password
            },

             JWT_SECRET
            );

        res.status(200).send(token);
    }
    } catch (error) {
       res.status(500).send(error);
    }

}

const profil = async (req, res) => {
    let token = req.headers.authorization;

    token = token.split(' ')[1]; //separar el Bearer  y muestra el token

    if(!token) {
        return res.status(403).send('Se requiere un token');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await model.getUser({email: decoded.email, password: decoded.password});
        if(user) {
            return res.status(200).send(user);
        } 
        else {
            return res.status(401).send('No autorizado');
        } 
    } catch (error) {
        return res.status(401).send('No autorizado');
    }



}

const buscar = async (req, res) => {
    const {email} = req.body
    const user = await model.buscarUsuario(email)
    res.send(user)

}
export const controller = {
    home,
    notFound, 
    registro,
    login,
    profil,
    buscar
}