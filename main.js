const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
const nodemailer = require("nodemailer");
// Soporte para bodies codificados en jsonsupport.
app.use(bodyParser.json());
// Soporte para bodies codificados
app.use(bodyParser.urlencoded({ extended: true }));

const emailForSends = process.env.email;
const password = process.env.password;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailForSends,
    pass: password,
  },
});

let mailOptions = {
  from: emailForSends,
  to: emailForSends,
  subject: "Nuevo Contacto!",
  text: "",
};

router.post("/sendEmail", (request, response) => {
  console.log(request.body);
  const email = request.body.email;
  const name = request.body.name;
  const message = request.body.message;

  mailOptions["text"] = `Mensaje: ${message} 
Nombre: ${name}
Email: ${email}`;

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      response.status(500);
      console.log(error);
    } else {
      response.end();
    }
  });
});

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log("Started on PORT " + process.env.PORT);
});
