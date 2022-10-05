const express = require("express");
const bodyParser = require ("body-parser");
const mongoose = require("mongoose");
const { application } = require("express");

mongoose.connect("mongodb://localhost:8080/media_shop",{usedUnifiedTopology: true, useNewUrlParser: true});

const searchSchema = new mongoose.Schema({
    videoName: String,
    description: String,
    rating: String,
    tapeCondition: String,
    content_warning: String,
    used: String
});

const Search = mongoose.model("Search", searchSchema);

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(express.static("public"));

app.route("/")
.get((req, res) =>{
    res.render("search");
})

.post((req, res) =>{
    let hint = "";
    let responce ="";
    let searchQ = req.body.search.toLowerCase();
    let limit = 1;

    if(searchQ.length > 0){
        search.find(funtion(err, results){
            if(err){
                console.log(err);
            }else{
                results.forEach(function(result){
                    if(result.videoName.indexOf(searchQ) != -1){
                        if(hint == ""){
                            hint="<a href ='" + results.url +"'target='_blank'>"+ result.videoName + "</a>";
                        }else if(limit < 5){
                            hint = hint + "<br /> <a href ='" + results.url +"'target='_blank'>"+ result.videoName + "</a>";
                            limit++;
                        }
                    }
                })
            }
            if(hint === ""){
                responce = "no response"
            }else{
                responce = hint;
            }
            res.send({responce: responce});
        })
    }
})


app.listen(process.env.PORT || 8080);