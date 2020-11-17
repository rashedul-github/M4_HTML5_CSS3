const fs = require('fs-extra');
const express = require('express');
const formidable = require('formidable');
const app = express();
const repo = require('./lib/repository').repo;

app.set('view engine', "raz");

app.use(express.static(__dirname));
app.get('/list', (req, res) => {
    res.json(repo.data);
});

app.post("/create", (req, res) => {
    var form = new formidable.IncomingForm();
    var emp = {};
	emp.id = repo.data.length+1;
    form.parse(req, (err, flds, files) => {
        //console.log(flds);
        emp.name = flds.name;
        emp.address = flds.address;
		emp.number = Number(flds.number);
		emp.roomId = Number(flds.room);
		emp.price = Number(flds.price);
        emp.date = new Date(flds.joindate);
        //console.log(files.picture.path);
        emp.picture = '/uploads/' + files.picture.name;
        repo.insert(emp);
        var src = files.picture.path;
        var dest = __dirname + "\\uploads\\" + files.picture.name;
        
        fs.copy(src, dest, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log("success!")
            }
        });
        res.redirect("/roombook.html");
    });   
});

app.get('/edit/:id', (req, res)=>{
    var p =repo.get(req.params.id);
    res.render('edit', {id:p.id, 
      name: p.name, address: p.address, number: p.number, 
      roomId: p.roomId,date: p.date, price: p.price, });
  });

  app.post('/edit/:id', (req, res)=>{
    var id = req.params.id;
    var form = new formidable.IncomingForm();
    form.parse(req, (err, flds)=>{
      repo.update(id, {name:flds.name, address:flds.address, number:flds.number, roomId:flds.room, date:flds.joindate, price:flds.price });
    });
    res.redirect("/roombook.html");
    
  });

//////////////////////////////////////////////////////////////////////////////
const server = app.listen(7777);

console.log("Server running at port 7777.");
console.log("Press Ctrl+C key to exit.");

