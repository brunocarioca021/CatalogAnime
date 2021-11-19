require('dotenv').config()
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const Anime =  require("./models/anime");

app.get("/", async (req, res) => {
    const animes = await Anime.findAll();
    res.render("index",{ 
    animes,
  });
});

app.get("/anime/:id", async (req, res) => {
    const anime = await Anime.findByPk(req.params.id);
    res.render("animeDetails", {
        anime,
    });
});

app.get("/animeCadastro", (req, res) => {
    res.render("animeCadastro");
});

app.post("/animeCadastrar", async (req, res) => {
    const anime = await FileSystem.Create({
        nome,
        descricao,
        imagem,
   });
   const id = Anime.findbyID(anime.id === Anime.id)
   res.redirect("animeDetails", {
       id,
   })
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);