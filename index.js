require('dotenv').config()
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const Anime =  require("./models/anime");
const message = "";

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
    res.render("animeCadastro", {
        message
    });
});

app.post("/animeCadastrar", async (req, res) => {
    const { nome, descricao, imagem } = req.body;

    if (!nome) {
      res.render("animeCadastro", {
        message: "Nome é obrigatório",
      });
    }
  
    else if (!imagem) {
      res.render("animeCadastro", {
        message: "Imagem é obrigatório",
      });
    }
  
    else {
      try {
        const anime = await Anime.create({
          nome,
          descricao,
          imagem,
        });
  
        res.render("animeCadastro", {
            anime, message: "Seu Anime foi cadastrado!"
        });
      } catch (err) {
        console.log(err);
  
        res.render("animeCadastro", {
          message: "Ocorreu um erro ao cadastrar o Anime!",
        });
      }
    }
  });

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);