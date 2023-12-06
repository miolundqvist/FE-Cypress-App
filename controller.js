const express = require("express");
const app = new express;
const portNr = 8080;

const bodyParser = require("body-parser");
const fs = require("fs");
const res = require("express/lib/response");

// Anger path till var filen ska sparas
const userDataPath = "./user.json";

//Anger att vår payload kommer komma i jsonformat
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Metod som meddelar när servern är igång
app.listen(portNr, () => {
    console.log('Servern lyssnar på 8080');
})

app.get("/", (req, res) => {
    res.sendFile("index.html", {root: __dirname});
})

app.get("/registration.html", (req, res) => {
    res.sendFile("registration.html", {root: __dirname});
})

app.get("/profile.html", (req, res) => {
    res.sendFile("profile.html", {root: __dirname});
})

app.get("/failedLogin.html", (req, res) => {
    res.sendFile("failedLogin.html", {root: __dirname});
})

//Post endpoint som sparar payload i JSON format till en fil
app.post("/", (req, res) => {
    //Hämta data från Payload
    const data = req.body;
    const jsonData = JSON.stringify(data, null, 2);

    //Skriva data till fil
    fs.writeFile(userDataPath, jsonData, (err) => {
        if (err) console.log(err);
    });

    res.send("Data mottagits: " + jsonData);
})

// Endpoint för inloggning
app.post("/login", (req, res) => {

    //Hämta payload data
    const loginUser = req.body;

    console.log(loginUser)

    if (fs.existsSync(userDataPath)) {
        fs.readFile(userDataPath, "utf8", (err, users) => {
            //Kontrollerar om error finns
            if (err) {
                console.log(err);
                res.send("Något har gått fel");
            }

            users = JSON.parse(users);

            users.forEach((user) => {
                //Kontrollera om username och pass matchar
                if(user.username == loginUser.username) {
                    //Kontroll av lösen
                    if (user.password == loginUser.password) {
                        //Hittat match och login lyckas.
                        res.sendFile("profile.html", {root: __dirname})
                    }
                    //Returnera fail om fel lösen
                    res.sendFile("failedLogin.html", {root: __dirname})
                }
        
            })
        
            //returnera fail om ingen user hittas
            res.sendFile("failedLogin.html", {root: __dirname})
            
        })
    } else {
        res.send("Filen finns inte");
    }
})
