const express = require('express');
const { allowedNodeEnvironmentFlags } = require('process');
const app = express()
var cors = require('cors')

app.use(cors())
app.use(express.json());

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello,users')
})

const users = [
    { id: 0, name: "sakil-sagor", email: "sakilsagor@gmai.com" },
    { id: 1, name: "sakil", email: "sakil@gmai.com" },
    { id: 2, name: "sagor", email: "sagor@gmai.com" },
    { id: 3, name: "pappu", email: "pappu@gmai.com" },
]

// search by use query parametars

app.get('/users', (req, res) => {
    const search = req.query.search;

    // const searchResult = users.filter(user => user.name.toLocaleLowerCase().includes(search))
    // search ? res.send(searchResult) : res.send(searchResult);

    if (search) {
        const searchResult = users.filter(user => user.name.toLocaleLowerCase().includes(search))
        res.send(searchResult);
    } else {
        res.send(users);
    }
})

// post method 


app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length;
    users.push(newUser);
    console.log(users);
    // res.send(JSON.stringify(newUser))
    // or
    res.json(newUser)
})




// dynamic api call

app.get('/users', (req, res) => {
    res.send(users)
})
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users[id];
    res.send(user);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})