require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));






app.get("/", function(req, res){ 
    let url=`https://api.spoonacular.com/recipes/random/?apiKey=${process.env.key}`
    let title,ingredients, summary, instructions, image;

    axios.get(url)
    .then(response=>{
        title = response.data.recipes[0].title;
        summary = response.data.recipes[0].summary;
        instructions = response.data.recipes[0].instructions;
        image = response.data.recipes[0].image;
        ingredients = response.data.recipes[0].extendedIngredients;
        for(var i=0; i<ingredients.length; i++){
        name = ingredients[i].name;
        amount = ingredients[i].measures.metric.amount;
        unit = ingredients[i].measures.metric.unitShort;
        }
        
        
      
        res.render('index.ejs',{title: title, summary: summary, instructions: instructions, image: image, ingredients: amount, name, unit });
        
    })
    .catch(error=>{
        console.log(error);
    });

 });

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});