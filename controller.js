const express = require("express");
const app = new express;
const portNr = 8080;

const bodyParser = require("body-parser");
const fs = require("fs");
const jsonFilePath = "./data.json";

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

app.get("/changePass.html", (req, res) => {
    res.sendFile("changePass.html", {root: __dirname});
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


// Endpoint för att byta lösenord på en användare
app.post("/register/changepass", (req, res) => {  
    //sökväg till user.json
    const userDataPath = "./user.json";

    //hämta payload data
    const newPass = req.body;

    fs.readFile(userDataPath, "utf8", (err, users) => {
        if (err) {
            console.log(err);
            res.send("Något har gått fel");
        }

        // Gör om users från sträng till array
        users = JSON.parse(users);

        users.forEach((user, i, arr) => {
            
            if (user.username == newPass.username) {
               //Uppdatera password i listan
                user.password = newPass.password;
            }
        })

        //spara tillbaka till user.json
        fs.writeFile(userDataPath, JSON.stringify(users, null, 2), (err) => {
            console.log('New password saved');
        });
    });
    
    res.redirect('/');
})

//Endpoint för att ta boty user
app.post("/register/remove", (req, res) => {
    //Sökväg till user.json
    const userDataPath = "./user.json";

    //Hämta payload data
    const userToRemove = req.body;

    fs.readFile(userDataPath, "utf8", (err, users) => {
        //TODO: Kontrollera err om något har gått fel

        //Konvertera users från string till Array
        users = JSON.parse(users);

        users.forEach((user, i, arr) => {
            //Kontrollerar om user är den som skall tas bort
            if (user.username == userToRemove.username) {
                arr.splice(i, 1);
            }
        })

        //Spara tillbaka till user.json fil
        fs.writeFile(userDataPath, JSON.stringify(users, null, 2), (err) => {
        });
    });

    res.redirect("/");
})