// import nodemailer = require('nodemailer');
const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'armandosnakepit00@gmail.com', // Correo para mandar los correos
      pass: 'bjtdjezkntsenyrc', // Contraseña generada para el acceso de las aplicaciones.
    },
  });

transporter.verify().then( () => {
  console.log("Listo para enviar");
});

module.exports=  {
  transporter
}