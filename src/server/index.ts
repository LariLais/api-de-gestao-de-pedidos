import { app } from "../app/app";

const PORT = process.env.PORT ?? 3001;
const localhostUrl = `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`Servidor rodando em ${localhostUrl}.`);
});
