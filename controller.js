const express = require("express")
const app = new express
const portNr = 8080

const bodyParser = require("body-parser")
const fs = require("fs")
const res = require("express/lib/response")

// Anger path till var filen ska sparas
const jsonFilePath = "./data.json"

//Anger att vår payload kommer komma i jsonformat
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Metod som meddelar när servern är igång
app.listen(portNr, () => {
    console.log('Servern lyssnar på 8080')
})

// Get req som returnerar en  sträng
app.get("/registration", (req, res) => {
    console.log("Mottagit ett request!!!")
    res.sendFile("registration.html", {root: __dirname});
})
