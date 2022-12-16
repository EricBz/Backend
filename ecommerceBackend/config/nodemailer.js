import nodemailer from "nodemailer"
import dotenv from 'dotenv'
dotenv.config();

const TEST_MAIL = process.env.MAIL_ENVIO

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: process.env.PASS_MAIL_ENVIO
    },
    tls: { //Agrege porque no me dejaba enviar por falta de credenciales
        rejectUnauthorized: false
    }
});

const mailOptions = {
    from: 'Servidor Node.js',
    to: TEST_MAIL,
    subject: 'Mail de prueba desde Node.js',
    html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>'
 }
 

async function enviarMail() { 
 try {
    const info = await transporter.sendMail(mailOptions)
    console.log(info)
 } catch (err) {
    console.log(err)
 }
}

export default async function enviarUserRegistrado(user) {
    const userNew = {
        from: 'Servidor Node.js',
        to: TEST_MAIL,
        subject: 'Mail de prueba desde Node.js',
        html: `<p>Mail usuario: ${user.mail}</p><p>Id del nuevo usuario: ${user._id}</p>`
     }
    try {
        const info = await transporter.sendMail(userNew)
        console.log(info)
     } catch (err) {
        console.log(err)
     }
}

export async function enviarMailCompra(compra) {
    const compraRealizada = {
        from: 'Servidor Node.js',
        to: TEST_MAIL,
        subject: 'Mail de prueba desde Node.js',
        html: `<p>Mail del usuario: ${compra.email}, Codigo de la compra en base de datos: ${compra.productos[0]._id}</p>`
     }
    try {
        const info = await transporter.sendMail(compraRealizada)
        console.log(info)
     } catch (err) {
        console.log(err)
     }
}

///export  { enviarUserRegistrado, enviarMailCompra } 