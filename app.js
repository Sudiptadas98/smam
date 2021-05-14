const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

dotenv.config({ path: "./config.env" });

require("./db/conn");
// const User = require("./model/userSchema");

app.use(express.json());

app.use(require("./router/auth"));

const PORT = process.env.PORT || 5000;


//Middleware

// const middleware = (req, res, next) => {
//     console.log("from middleware");
//     next();
// }


// app.get("/", (req, res) => {
//     res.send(`Hello World from server app js`);
// });

// app.get("/about", (req, res) => {
//     res.send(`about page`);
// });

// app.get("/contact", (req, res) => {
//     res.cookie("Test", "XYZ");
//     res.send(`contact page`);
// });


if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`);
})