require('dotenv').config();
const express = require("express");
const logger = require("morgan");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const htmlRoutes = require("./routes/html");
//const authRoutes = require("./routes/auth");
//const apiRoutes = require("./routes/api");
//const errorRoutes  = require("./routes/error");
//const updateArticles  = require("./db/update");

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/test_cf";

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static("public"));


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex:true, useUnifiedTopology: true});


//mongoose.set('useFindAndModify', false);
//mongoose.set('useCreateIndex', true);

app.use(htmlRoutes);
//app.use(authRoutes);
//app.use(apiRoutes);
//app.use(errorRoutes);

//updateArticles.marketwatch();
//updateArticles.phys();

app.listen(PORT, function(){
    console.log(`App now listening on Port#: ${PORT}`);
    
});

module.exports = app;