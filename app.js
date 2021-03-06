const express = require("express");
const Photo = require("./models/Photo");
const fileUpload = require("express-fileupload"); // modülü kullanıma alıyoruz.
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const fs = require("fs");
const photoController = require('./controllers/photoController');
const pageController = require('./controllers/pageController');


app.use(fileUpload());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb+srv://mustafa:12345612@cluster0.om4ie.mongodb.net/cleanblog?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,

}).then(()=>{
  console.log('DB Coneectet')
}).catch((err)=>{
  console.log(err)
})


app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddPage);

app.get('/photos/edit/:id', pageController.getEditPage);

app.listen(port, () => {
  console.log("Port dinleniyor");
});
