const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite')

const app = express()
const port = 3000

//db: any
open({
  filename: 'clima.db',
  driver: sqlite3.Database,
  verbose: true
}).then((database) => { 
    db = database;
})

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET ALL
app.get('/api/v1/estacoes', (req, res) => {
    // A quantidade de estações que aparecem foi limitada para a página conseguir carregar sem demora.
    db.all('SELECT * FROM clima LIMIT 60').then((data) => {
        res.json(data);
    })
});

// GET DETAIL
app.get('/api/v1/estacoes/:id', (req, res) => {
    const id = req.params.id;
    const sqlCommand = 'SELECT * FROM clima WHERE id_estacao = "' + id + '"';
    db.all(sqlCommand).then((data) => {
        res.json(data);
    })
});

// POST
app.post('/api/v1/estacoes', (req, res) => {
    const params = req.body;

    // foi necessário extrair os objetos do cada linha, e posteriormente concatená-los em formato de string
    const values = extractObjPropertiesValues(params).join(",")
    const sqlCommand = 'INSERT INTO clima VALUES (' + values + ')';
    db.run(sqlCommand).then((data) => {
        res.json("Estação inserida com sucesso!");
    })
});

var extractObjPropertiesValues = function (obj) {
    var arr = [];
    for (var x in obj) if (obj.hasOwnProperty(x)) {
        if (typeof obj[x] === 'string') {
            arr.push("'" + obj[x] + "'");
        } else {
            arr.push(obj[x]);
        }
    }
    return arr;
}

// PUT
app.put('/api/v1/estacoes/:id', (req, res) => {
    const id = req.params.id;
    const params = req.body;
       const values = extractObjProperties(params).join(",")
    const sqlCommand = 'UPDATE clima SET ' + values + ' WHERE id_estacao = "' + id + '"';
    db.run(sqlCommand).then((data) => {
        res.json("Dados da estação atualizados com sucesso!");
    })
});

 // foi necessário extrair os objetos do cada linha, e posteriormente concatená-los em formato de string
var extractObjProperties = function (obj) {
    var arr = [];
    for (var key in obj) if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (typeof value === 'string') {
            arr.push(key + " = '" + value + "'");
        } else {
            arr.push(key + " = " + value);
        }
    }
    return arr;
}

// DELETE
app.delete('/api/v1/estacoes/:id', (req, res) => {
    const id = req.params.id;
    const sqlCommand = 'DELETE FROM clima WHERE id_estacao = "' + id + '"';
    db.all(sqlCommand).then((data) => {
        res.json("Estação deletada com sucesso!");
    })
});

app.listen(port, () => console.log(`Hello world. Clima API listening on port ${port}!`));