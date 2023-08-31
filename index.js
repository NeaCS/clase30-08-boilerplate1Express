const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

app.get('/', (req, res) => {
    if (err) throw err;
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/addSogn',(req,res)=>{
    let data = JSON.parse(fs.readFileSync('repositorio.json','utf-8'));
    req.body.id=Date.now().toString();
    const {title,autor}=req.body;
    const dataa={id:Date.now().toString(),title,autor};
    data.push(dataa);
    fs.writeFileSync('repositorio.json',JSON.stringify(data),'utf-8');
    res.json(req.body);
})

app.get('/getSogn',(req,res)=>{
    let data = JSON.parse(fs.readFileSync('repositorio.json','utf-8'));
    res.json(data);
})





