const express = require("express");
const server = express();

//pegar o banco de dados
const db = require("./database/db");

//configurar pasta publica
server.use(express.static("public"));

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true}));

// utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});


//configurar caminhos da minha aplicação
// página inicial
// req: requisição
// res: resposta
server.get("/", (req, res) => {
    return res.render("index.html");
});

server.get("/create-point", (req, res) => {
    return res.render("create-point.html");
});

server.post("/save-point", (req, res) => {
    // inserir dados no db
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `;
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];
        
    function afterInsertData(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Cadastrado com sucesso");
        console.log(this);
        return res.render("create-point.html", {saved:true});
    }
    db.run(query, values, afterInsertData);
});

server.get("/search", (req, res) => {

    const search = req.query.search;

    if (search == "") {
        // pegar todos os dados
        db.all(`Select * From places`, function(err, rows) {
            if(err) {
                return console.log(err);
            }
            const total = rows.length;
            // mostrar pagina com dados do banco
            return res.render("search-results.html", {places: rows, total});
        });
    }
    else {
        db.all(`Select * From places Where city like '%${search}%'`, function(err, rows) {
            if(err) {
                return console.log(err);
            }
            const total = rows.length;
            // mostrar pagina com dados do banco
            return res.render("search-results.html", {places: rows, total});
        });
    }
});

//ligar o servidor
server.listen(3000);
