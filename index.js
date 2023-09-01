const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

const connection = mysql.createConnection({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'clase31'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected mysql!');
});

app.get('/', (req, res) => {
    if (err) throw err;
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/addSogn', (req, res) => {
    const { title, autor } = req.body;
    const data = { title, autor };
    try {
        connection.query('INSERT INTO canciones SET ?', data, (err, result) => {
            if (err) throw err;
            res.json(result);
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/getSogn', (req, res) => {
    try {
        connection.query('SELECT * FROM canciones', (err, result) => {
            if (err) throw err;
            res.json(result);
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})



//repolocal
// app.post('/addSogn',(req,res)=>{
//     let data = JSON.parse(fs.readFileSync('repositorio.json','utf-8'));
//     req.body.id=Date.now().toString();
//     const {title,autor}=req.body;
//     const dataa={id:Date.now().toString(),title,autor};
//     data.push(dataa);
//     fs.writeFileSync('repositorio.json',JSON.stringify(data),'utf-8');
//     res.json(req.body);
// })

// app.get('/getSogn',(req,res)=>{
//     let data = JSON.parse(fs.readFileSync('repositorio.json','utf-8'));
//     res.json(data);
// })

// app.delete('/deleteSogn/:id',(req,res)=>{
//     const {id}=req.params;
//     let data = JSON.parse(fs.readFileSync('repositorio.json','utf-8'));
//     const index=data.findIndex(song=>song.id===id);
//     if(index===-1) return res.status(404).json({message:'Song not found'});
//     const removed=data.splice(index,1);
//     fs.writeFileSync('repositorio.json',JSON.stringify(data),'utf-8');
//     res.json(removed);
// })

// app.put('/updateSogn/:id',(req,res)=>{
//     const {id}=req.params;
//     const {title,autor}=req.body;
//     let data = JSON.parse(fs.readFileSync('repositorio.json','utf-8'));
//     const index=data.findIndex(song=>song.id===id);
//     console.log('index',index);
//     if(index===-1) return res.status(404).json({message:'Song not found'});
//     data[index].title=title;
//     data[index].autor=autor;
//     fs.writeFileSync('repositorio.json',JSON.stringify(data),'utf-8');
//     res.json(data[index]);
// })




