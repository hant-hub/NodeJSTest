const fs = require("fs");
const path = require('path');
const express = require("express");
const visual = require('./visual.js');



const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(express.json({}));


app.set('view engine', 'pug');

let state = true;
let clockInTime;
app.post('/clock', (req, res) => {

    const date = new Date(req.body.date);
    const filepath = "data/" + req.body.identity + "/" + date.getFullYear() + "." + date.getMonth() + ".txt";

    if (state) {
        res.send("Clock Out");
        clockInTime = date;
    } else {
        res.send("Clock In");
        const write = clockInTime.toJSON() + " to " + date.toJSON() + " for " + (date - clockInTime) + "\n";
        fs.mkdir("./data/" + req.body.identity, (error) => {
            if (error && error.code != 'EEXIST') {
                console.log(error);
            }});
        fs.writeFileSync(filepath, write, {flag:"a+"});
        console.log(write);
    }
    state = !state;
});

app.get('/', (req, res) => {
    
    res.render('index');
});

app.get('/identity', (req, res) => {
    res.render('identity');
});

app.get('/calendar', (req, res) => {
    res.render('calendar');
});

app.put('/totalHours', (req, res) => {
    const total = 10;
    console.log(req.body);
    res.send({"total": visual.CalcTotalHours(req.body.identity)});
});


app.listen(8000, () => console.log("http://localhost:8000/"));

