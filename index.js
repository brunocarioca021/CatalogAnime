require('dotenv').config()
const { countReset } = require('console');
const { render } = require('ejs');
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

app.get("/animes", async (req, res) => {
    const animes = await Anime.findAll();
    
    res.render("anime",{ 
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

app.get("/animeUpdate/:id", async (req, res) => {
  const anime = await Anime.findByPk(req.params.id);
  if(!anime){
    res.render("animeUpdate", {
      message: "Not Found",
    });
  }
  res.render("animeUpdate", {
    anime, message
  })
});

app.post("/animeUpdate/:id", async (req, res) => {
  const anime = await Anime.findByPk(req.params.id);
  const { nome, descricao, imagem } = req.body;

  anime.nome = nome;
  anime.descricao = descricao;
  anime.imagem = imagem;

  const animeUpdated = await anime.save();
  res.redirect("/", {
    anime: animeUpdated,
    message: "Anime Atualizado",
  });
});

app.get("/animeDeletar/:id", async (req, res) => {
  const anime = await Anime.findByPk(req.params.id);
  if(!anime){
    res.render("animeDeletar", {
      anime,
      message: "Not Found",
    });
  }
  res.render("animeDeletar", {
    anime,
    message
  });
});

app.post("/animeDeletar/:id", async (req, res) => {
  const anime = await Anime.findByPk(req.params.id);
  if(!anime){
    res.render("animeDeletar", {
      anime,
      message,
    })
  }
  await anime.destroy();
  res.redirect("/")
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);