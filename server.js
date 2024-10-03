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
    const filepath = "data/" + date.getFullYear() + "." + date.getMonth() + ".txt";

    if (state) {
        res.send("Clock Out");
        clockInTime = date;
    } else {
        res.send("Clock In");
        const write = clockInTime.toJSON() + " to " + date.toJSON() + " for " + (date - clockInTime) + "\n";
        fs.writeFileSync(filepath, write, {flag:"a+"});
        console.log(write);
    }
    state = !state;
});

app.get('/', (req, res) => {
    
    res.render('index');
});

app.listen(8000, () => console.log("http://localhost:8000/"));
