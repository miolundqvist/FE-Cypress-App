const express = require("express");
const app = new express;
const portNr = 8080;

const bodyParser = require("body-parser");
const fs = require("fs");
const jsonFilePath = "./data.json";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.listen(portNr, () => {
    console.log('Server is listening on 8080');
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

// Login
app.post("/login", (req, res) => {
    const userDataPath = "./user.json";

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
            users.forEach( (user) => {
                if (user.username === loginUser.username) {
                    userFound = true;
                    if (user.password === loginUser.password) {
                         res.sendFile("profile.html", {root: __dirname});
                    }
                     else res.sendFile("failedLogin.html", {root: __dirname});
                }
            })
        
             if (!userFound) res.sendFile("failedLogin.html", {root: __dirname});

        })
    } else {
        res.send("Filen finns inte");
    }

})


// Create new user
    app.post("/register", (req, res) => {  
        const userDataPath = "./user.json";

        const newUser = req.body;

        fs.readFile(userDataPath, "utf8", (err, users) => {
            if (err) {
                console.log(err);
                res.send("Något har gått fel");
            }

            users = JSON.parse(users);

            users.push(newUser);

            fs.writeFile(userDataPath, JSON.stringify(users, null, 2), (err) => {
                console.log('New user saved');
            });
        });
        
        res.redirect('/');
    })


// Change password
app.post("/register/changepass", (req, res) => {  
    const userDataPath = "./user.json";

    const newPass = req.body;

    fs.readFile(userDataPath, "utf8", (err, users) => {
        if (err) {
            console.log(err);
            res.send("Något har gått fel");
        }

        users = JSON.parse(users);

        users.forEach((user, i, arr) => {
            
            if (user.username == newPass.username) {
                user.password = newPass.password;
            }
        })

        fs.writeFile(userDataPath, JSON.stringify(users, null, 2), (err) => {
            console.log('New password saved');
        });
    });
    
    res.redirect('/');
})

// Remove user
app.post("/register/remove", (req, res) => {
    const userDataPath = "./user.json";

    const userToRemove = req.body;

    fs.readFile(userDataPath, "utf8", (err, users) => {

        users = JSON.parse(users);

        users.forEach((user, i, arr) => {
            if (user.username == userToRemove.username) {
                arr.splice(i, 1);
            }
        })

        fs.writeFile(userDataPath, JSON.stringify(users, null, 2), (err) => {
        });
    });

    res.redirect("/");
})
