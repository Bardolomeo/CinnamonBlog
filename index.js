const express = require('express');
var bodyParser = require('body-parser');

const app = express();
const port = 3000;

var _entry = new Array;
_entry.push("null", "null"); //initialize for checks in post

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended : true}));

//homepage
app.get("/", (req, res) => {
	res.render("index.ejs", {entry : _entry});
})

//entries list
app.get("/allentries", (req, res) => {
	res.render("allEntries.ejs", {entries : _entry});
})

//newEntry
app.post("/", (req, res) => {
	pushNewEntry(req);
	res.render("index.ejs", {entry : _entry});
});

//entry removed
app.post("/removed", (req, res) => {
	var ind = req.body["toRemove"];
	_entry.splice(ind, 1);
	res.render("index.ejs", {entry : _entry});
});

//single entry page
app.post("/entry", (req, res) => {
	var _index = req.body["entryIndex"];
	res.render("entry.ejs", {index : _index, entries : _entry});
});

//edit entry
app.post("/edit", (req, res) => {
	let _index = req.body["indToEdit"];
	res.render("editEntry.ejs", {index : _index, entries : _entry});
});

//entry post edit
app.post("/postedit", (req, res) => {
	let _index = req.body["indToEdit"];
	_entry[_index].title = req.body["titleEdited"];
	_entry[_index].body = req.body["bodyEdited"];
	res.render("entry.ejs", {index : _index, entries : _entry});
});

//html behaviour script
app.get("/src/behaviour.js", (req, res) => {
	res.sendFile(__dirname + "/src/behaviour.js");
});

app.listen(port, () => {
	console.log("Server listening at " + port + ".");
});

function pushNewEntry(req){
	if (_entry[_entry.length - 1].body != req.body["entryContent"]){
		var title = req.body["entryTitle"]; 
		if (title.length > 150)
			title = title.slice(0, 149);
		var body = req.body["entryContent"];
		var _date = new Date();
		let day = _date.getDate();
		let month = _date.getMonth() + 1;
		let year = _date.getFullYear();
		_entry.push({title, body, day, month, year});
	}
}