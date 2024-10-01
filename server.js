const fs = require("fs");

const express = require("express")
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.set('view engine', 'pug');


let state = true;
let clockInTime;
app.post('/clock', (req, res) => {

    const date = new Date(req.body.date);
    console.log(date);
    fs.writeFileSync("times.txt", state + date + "\n", {flag:"a+"});

    if (state) {
        res.send("Clock Out");
        clockInTime = date;
    } else {
        res.send("Clock In");
        console.log((date - clockInTime));
    }
    state = !state;

});

app.get('/', (req, res) => {
    
    res.render('index');
});

app.listen(8000, () => console.log("http://localhost:8000/"));
