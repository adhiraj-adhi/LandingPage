const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
require("dotenv").config();
const path = require("path");

// setting up cookie-parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());



// for reading the data from request body
app.use(express.json());
app.use(express.urlencoded({ extended : false }))



// setting up router 
const router = require("../routes/router");
app.use("/", router);



// setting up static path for public folder (always use this after configuring router)
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));


// setting up viewengine and views path 
const viewsPath = path.join(__dirname, "../templates/views");
app.set('view engine', 'ejs');
app.set("views", viewsPath);



const Connection = require("./db/Connection");

const DBConnection = async() => {
    const url = process.env.MONGO_URL;
    try {
        const result = await Connection(url);
        if(result){
            app.listen(port, console.log(`http://localhost:${port}`));
        }
    } catch (error) {
        console.log(error);
    }
}

DBConnection();