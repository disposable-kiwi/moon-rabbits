const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { autocompleteClasses } = require("@mui/material");
const PORT = 4000;

mongoose.connect("mongodb://localhost:27017/rabbitsDB",{useNewUrlParser:true});

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("Connection with MongoDB was successful");
});

const rabbitSchema = new mongoose.Schema({
    title:String,
    content:String
});

const Rabbit = mongoose.model("rabbit", rabbitSchema);

const router = express.Router();

app.use("/",router);

router.route("/submit")
    .get((req,res)=>Rabbit.find({},(err,rabbits)=>{
            if(!err){
                res.send(rabbits);
            }else{
                res.send(err);
            }
    }));

app.use(cors());
app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});