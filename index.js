const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const { body, param, validationResult } = require('express-validator');


app.use(bodyParser.json());


const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE cats (id INTEGER PRIMARY KEY, name TEXT, votes INTEGER)");
  db.run("CREATE TABLE dogs (id INTEGER PRIMARY KEY, name TEXT, votes INTEGER)");
});

// healthy check
app.get('/', (req, res) => {
  try {
    res.status(200).send("Healthy!")
  } catch(err) {
    res.status(400).send("Erro da Clarinha")
  }
})

const createValidation = [
  body('name').notEmpty().trim(),
];


app.post('/cats', createValidation, (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send("Nome inválido!");
  }

  const name = req.body.name;
  db.run(`INSERT INTO cats (name, votes) VALUES ('${name}', 0)`, function(err) {
    if (err) {
      res.status(500).send("Erro ao criar o gato");
    } else {
      res.status(201).json({ id: this.lastID, name, votes: 0 });
    }
  });
});

app.post('/dogs', createValidation, (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send("Nome inválido!");
  }

  const name = req.body.name;
  db.run(`INSERT INTO dogs (name, votes) VALUES ('${name}', 0)`, function(err) {
    if (err) {
      res.status(500).send("Erro ao criar o cachorro");
    } else {
      res.status(201).json({ id: this.lastID, name, votes: 0 });
    }
  });
});


const voteValidation = [
  param('animalType').isIn(['cats', 'dogs']),
  param('id').isInt({ min: 1 }),
];

app.post('/vote/:animalType/:id', voteValidation, (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send("Erro ao computador o voto, verifique os parametros utilizados");
  }

  const animalType = req.params.animalType;
  const id = req.params.id;
  console.log(animalType);
  console.log(id);

// Verifica se o id existe no banco de dados, antes de add o voto
    const verificacao = `SELECT id FROM ${animalType} WHERE id = ${id}`;

    db.get(verificacao, (err, row) => {
    if (err) {
      res.status(500).send("Esse animal não existe");
    } else if (!row) {
      res.status(404).send("Esse animal não existe");
    } else {

      // Se o id for encontrado no banco:
      const updateQuery = `UPDATE ${animalType} SET votes = votes + 1 WHERE id = ${id}`;

      db.run(updateQuery, function(updateErr) {
        if (updateErr) {
          res.status(500).send("Erro ao realizar o voto");
        } else {
          res.status(200).send("Voto computado");
        }
      });
    }
  });
});

app.get('/cats', (req, res) => {
  db.all("SELECT * FROM cats", [], (err, rows) => {
    if (err) {
      res.status(500).send("Erro ao buscar pela lista de gatos");
    } else {
      res.json(rows);
    }
  });
});

app.get('/dogs', (req, res) => {
  db.all("SELECT * FROM dogs", [], (err, rows) => {
    if (err) {
      res.status(500).send("Erro ao buscar pela lista de cachorros");
    } else {
      res.json(rows);
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Ocorreu um erro!');
});

app.listen(port, () => {
  console.log(`Cats and Dogs Vote app listening at http://localhost:${port}`);
});