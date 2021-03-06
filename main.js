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

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: emailForSends,
//     pass: password,
//   },
// });

let mailOptions = {
  from: emailForSends,
  to: emailForSends,
  subject: "Nuevo Contacto!",
  text: "",
};

router.post("/sendEmail", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailForSends,
      pass: password,
    },
  });

  const email = req.body.email;
  const name = req.body.name;
  const message = req.body.message;

  mailOptions["text"] = `Mensaje: ${message} 
Nombre: ${name}
Email: ${email}`;

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
      console.log(error);
    } else {
      console.log("enviado");
      res.redirect("https://mi-portafolio-topaz.vercel.app/");
    }
  });
});

app.use("/", router);

app.listen(process.env.PORT || 5000, () => {
  console.log("%s listening ");
  // eslint-disable-line no-console
});
