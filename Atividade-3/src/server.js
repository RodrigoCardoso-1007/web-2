port = 3003

const express = require('express')
const db = require('./database/db')
const app = express()
const itemController = require('./controllers/item')

app.use(express.json())

db.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));

app.listen(port, () => {
    console.log(`Servidor iniciado! Porta: ${port}`)
})

app.get('/items', (req, res, next) => {
    itemController.listItems()
        .then((items) => res.send(items))
        .catch((err) => {
            console.log('Erro na consulta dos itens', JSON.stringify(err))
            return res.send(err)
        });
});


app.get('/items/:id', (req, res, next) => {
    const id = req.params.id

    itemController.getItemsById(id)
        .then((items) => res.send(items))
        .catch((err) => {
            console.log('Erro ao consultar do item', JSON.stringify(err))
            return res.send(err)
        });
})

app.delete('/items/:id', (req, res, next) => {
    const id = req.params.id

    itemController.deleteItem(id)
        .then(() => res.send("Apagado com sucesso"))
        .catch((err) => {
            console.log('Erro ao apagar items', JSON.stringify(err))
            return res.send(err)
        });
})

app.post('/items', (req, res, next) => {
    itemController.createItem({
        nome: req.body.nome,
        valor: req.body.valor
    })
        .then((item) => res.send(item))
        .catch((err) => {
            console.log('Erro no cadastro do item', JSON.stringify(err))
            return res.status(500).send(err)
        })
})

app.post('/items/:id', (req, res, next) => {
    const id = req.params.id
    const item = req.body

    itemController.updateItem(id, { ...item })
        .then((item) => res.send(item))
        .catch((err) => {
            console.log('Erro ao atualizar item', JSON.stringify(err))
            return res.status(500).send(err)
        })
})