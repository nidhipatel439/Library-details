const express = require("express");
const path = require("path");
const fs = require("fs");
const { JSDOM } = require("jsdom");

const port = 3000;
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


var library;
fs.readFile("./data/library-data.kml", "utf-8", (err, data) => {
    const dom = new JSDOM(data, { contentType: "application/xml" });
    library = dom.window.document;
})



app.get("/", (req, res) => {
    let list = listAllLibrary();
    res.render("index", { title: "Home", libraries: list });
});

app.get("/library", (req, res) => {
    const oneLibrary = library.querySelector(`#${req.query.id}`);
    res.render("library", { title: "library", library: oneLibrary });
})

function libraryDetail(id) {
    return library.getElementById(id);
}

function listAllLibrary() {
    return library.querySelectorAll("Placemark");
}




app.listen(port, () => {
    console.log(`listening on ${port}`);
});

