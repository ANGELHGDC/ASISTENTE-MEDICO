const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

// 🔐 Carga de la clave desde variables de entorno
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Eres un asistente médico virtual. Realizas triaje básico, educación médica sencilla y nunca das diagnósticos definitivos. Si es grave, recomiendas acudir al médico.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error con OpenAI:", error.message);
    res.status(500).json({ error: "Error al procesar la solicitud." });
  }
});

app.get("/", (req, res) => {
  res.send("🩺 Asistente médico virtual en funcionamiento.");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
✅ También necesitas:
📄 package.json
json
Copiar
Editar
{
  "name": "asistente-medico",
  "version": "1.0.0",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "openai": "^4.

Usa ChatGPT para cada búsqueda
Descarga la extensión de Chrome para ca
