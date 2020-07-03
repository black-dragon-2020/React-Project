const mysql = require('mysql');
const express =require('express');
const app =express();
const bodyParser=require('body-parser');

app.use(bodyParser.json());

var MysqlConnection=mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'password',
        database:'custumersdb',
        insecureAuth:true,
        multipleStatements:true
    }
)
MysqlConnection.connect(err=>{
    if(!err){
        console.log('DB connectione succeded');
    }
    else{
        console.log('DB connection faild \n error was : ',JSON.stringify(err,undefined,2));
    }
})
//!Add Custumer

// app.post('/Submit',(req,res)=>{
//     // let post={id:54,fisrtName:'ABDO',lastName:'MALON'};
//     let post={id:req.body.id,fisrtName:req.body.fisrtName,lastName:req.body.lastName};

//     var sql ='INSERT INTO custumer SET ?';
//     MysqlConnection.query(sql,post,(err,result)=>{
//         if(err) throw err;
//         console.log(result);
//         res.send('Posts Table Created..');
//         console.log('inserted',result);
//         console.log('inserted',post);
//     })
// });

//! Get data
app.get('/api/custumers',(req,res)=>{
   MysqlConnection.query('SELECT * FROM custumersdb.custumer',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
   })
});

//!Get one custumer
app.get('/api/custumers/:id',(req,res)=>{
    MysqlConnection.query('SELECT * FROM custumersdb.custumer where id= ?',[req.params.id],(err,rows,fields)=>{
         if(!err){
             res.send(rows);
         }
         else{
             console.log(err);
         }
    })
 });


//!delte a custumer
app.delete('/api/custumers/del/:id',(req,res)=>{
    MysqlConnection.query('DELETE FROM custumersdb.custumer where id= ?',[req.params.id],(err,rows,fields)=>{
         if(!err){
             res.send('Custmer was deleted');
         }
         else{
             console.log(err);
         }
    })
 });

//!Add a custumer
app.post('/api/custumers/insert',(req,res)=>{
    let cus=req.body;
   // const {id,firstName,lastName}=req.query;
    var sql = `insert into custumer values(${cus.id},'${cus.fisrtName}','${cus.lastName}')`;
    MysqlConnection.query(sql,(err,rows,fields)=>{
         if(!err){
          res.send(JSON.stringify(rows));
         }
         else{
             console.log(cus.id);
             console.log("not!");
             console.log(err);
         }
    })
 });

//!Edit a custumer
app.post('/api/custumers/Edit',(req,res)=>{
    let cus=[
        req.body,
        req.query.id
    ];
   // const {id,firstName,lastName}=req.query;
    var sql = `Update custumer SET fisrtName='${req.body.fisrtName}' ,lastName='${req.body.lastName}' where id = ${req.body.id}`;
    MysqlConnection.query(sql,(err,rows,fields)=>{
         if(!err){
          res.send(JSON.stringify(rows));
         }
         else{
             console.log(cus.id);
             console.log("not!");
             console.log(err);
         }
    })
 });


 //!rendering
const port =5000;

app.listen(port,()=> console.log(`server started on port ${port}`));








