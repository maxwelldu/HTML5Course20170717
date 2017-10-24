/**
 * Created by Danny on 2015/9/29 14:41.
 */
var express = require("express");
var app = express();
var router = require("./router/router.js");
var db = require("./models/db.js");

app.set("view engine","ejs");

app.get("/",router.showIndex);
app.get("/add",router.showadd);
app.get("/doadd",router.doadd);
app.get("/edit/:sid",router.edit);
app.get("/doedit/:sid",router.doedit);
app.get("/remove/:sid",router.remove);

app.listen(3000);
