const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser')
const path = require('path');

const usersDataPath = './data/data.json';

function getUsersData () {
    const usersData = fs.readFileSync(usersDataPath).toString();
    return JSON.parse(usersData)
};


app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/users', (req, res) => {
    const users = getUsersData();
    res.json(users);
});

app.post('/users', (req, res) => {
    fs.writeFile(usersDataPath, JSON.stringify(req.body), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
        res.json(req.body);
    });
});

app.listen(8080, () => {
    console.log('Example app listening on port 8080.');
});