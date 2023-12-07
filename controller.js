const express = require("express");
const app = new express;
const portNr = 8080;

const bodyParser = require("body-parser");
const fs = require("fs");
const jsonFilePath = "./data.json";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

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

app.get("/register.html", (req, res) => {
    res.sendFile("register.html", {root: __dirname});
})

app.get("/profile.html", (req, res) => {
    res.sendFile("profile.html", {root: __dirname});
})

app.get("/failedLogin.html", (req, res) => {
    res.sendFile("failedLogin.html", {root: __dirname});
})

//Endpoint för inloggning
app.post("/login", (req, res) => {
    const userDataPath = "./user.json";

    //Hämta payload data
    const loginUser = req.body;

    if (fs.existsSync(userDataPath)) {
        fs.readFile(userDataPath, "utf8", (err, users) => {
            //Kontrollerar om error finns
            if (err) {
                console.log(err);
                res.send("Något har gått fel");
            }

            console.log(loginUser);

            let userFound = false;
            users = JSON.parse(users);
            //const arru = Array.from(users);
            users.forEach( (user) => {
                //Kontrollera om username matchar, samt även password
                if (user.username === loginUser.username) {
                    userFound = true;
                    //Kontrollera lösenordet
                    if (user.password === loginUser.password) {
                        //Hittat en match. Login lyckas.
                         res.sendFile("profile.html", {root: __dirname});
                    }
                    //Returnera Fail om fel lösenord
                     else res.sendFile("failedLogin.html", {root: __dirname});
                }
            })
        
            //Returnera fail om ingen user hittades
             if (!userFound) res.sendFile("failedLogin.html", {root: __dirname});

        })
    } else {
        res.send("Filen finns inte");
    }

})


// Endpoint för ny användare
    app.post("/register", (req, res) => {  
        //sökväg till user.json
        const userDataPath = "./user.json";

        //hämta payload data
        const newUser = req.body;

        fs.readFile(userDataPath, "utf8", (err, users) => {
            if (err) {
                console.log(err);
                res.send("Något har gått fel");
            }

            // Gör om users från sträng till array
            users = JSON.parse(users);

            //lägger till ny user i listan
            users.push(newUser);

            //spara tillbaka till user.json
            fs.writeFile(userDataPath, JSON.stringify(users, null, 2), (err) => {
                console.log('New user saved');
            });
        });
        
        res.redirect('/');
    })
