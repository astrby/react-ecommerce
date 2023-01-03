const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user:'root',
    host: 'localhost',
    password: 'administrador',
    database: 'inventario_db',
});


app.get('/productos', (req, res)=>{
    db.query("SELECT * FROM inventario", (err,result)=>{
        if(err){
            console.log('error')
        }else{
            res.send(result)
        }
    });
})

app.listen(3001, ()=>{
    console.log('Corriendo');
});

