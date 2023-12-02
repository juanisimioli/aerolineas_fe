// api/mailServer.js
const Mailin = require("mailin");

const server = new Mailin({
  port: process.env.PORT || 3001, // Utiliza el puerto proporcionado por Vercel o el puerto 3001 si se ejecuta localmente
  disableWebhook: true,
});

server.start();

server.on("message", (connection, data, content) => {
  console.log("Nuevo correo recibido:");
  console.log("De:", data.from[0].address);
  console.log("Asunto:", data.subject);
  console.log("Cuerpo:", data.text || data.html);

  // Aquí puedes realizar acciones adicionales, como enviar datos a tu contrato inteligente.
});

console.log(
  "Servidor de correo iniciado en el puerto",
  process.env.PORT || 3001
);
