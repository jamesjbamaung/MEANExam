var pets = require("../controllers/pets.js");
var path = require("path");

module.exports = function(app){

    app.get("/pets", pets.index)

    app.get("/editPet/:id", pets.details)

    app.post("/pets", pets.addPet)
    
    app.put("/like/:id", pets.addLike)

    app.put("/pets/:id", pets.editPet)

    app.delete("/delete/:id", pets.deletePet)

    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });
}