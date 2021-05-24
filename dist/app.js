"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// let ptoclient = getProducts();
const app = express_1.default();
app.use(bodyParser.urlencoded({
    extended: true
}));
const port = 3000;
app.use(express_1.default.static("public"));
mongoose.connect("mongodb://localhost:27017/practicalDB", { useNewUrlParser: true, useUnifiedTopology: true });
const practicalSchema = new mongoose.Schema({
    name: String,
    age: Number,
    empno: Number,
    empd: String
});
const Practical = mongoose.model("Practical", practicalSchema);
// app.get("/",function(req,res){
//     res.send(ptoclient);
// });
app.route("/")
    .get((req, res) => {
    Practical.find({}, function (err, foundPracticals) {
        if (!err) {
            res.send(foundPracticals);
        }
        else {
            console.log(err);
        }
    });
})
    .post((req, res) => {
    const newPractical = new Practical({
        name: req.body.name,
        age: req.body.age,
        empno: req.body.empno,
        empd: req.body.empd
    });
    newPractical.save(function (err) {
        if (!err) {
            res.send("Successfully added a new employee");
        }
        else {
            res.send(err);
        }
    });
})
    .delete((req, res) => {
    Practical.deleteMany({}, function (err) {
        if (!err) {
            res.send("successfully deleted all items from Practical collection");
        }
        else {
            res.send(err);
        }
    });
});
app.route("/employee/:names")
    .get((req, res) => {
    Practical.findOne({ name: req.params.names }, function (err, foundPractical) {
        if (foundPractical) {
            res.send(foundPractical);
        }
        else {
            res.send(err);
        }
    });
})
    .put((req, res) => {
    Practical.updateOne({ name: req.params.title }, { name: req.body.newname }, { overwrite: true }, function (err) {
        if (!err) {
            res.send("successfully updated new name of employee");
        }
        else {
            res.send(err);
        }
    });
})
    .delete(function (req, res) {
    Practical.deleteOne({ name: req.params.title }, function (err) {
        if (!err) {
            res.send("deleted one employee successfully");
        }
        else {
            res.send(err);
        }
    });
});
// function getProducts() {
// let p = new Product();
// p.title = "Assignment";
// p.year = 2021;
// return p;
// }
app.listen(3000, () => console.log('Succesfully started server'));
//# sourceMappingURL=app.js.map