//1.importing express
const express=require('express');
const movieModel = require('./model/addmovie');
const cors=require('cors');
const path = require('path');


//2.Initialization
const app = new express();

//3.middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'/build')));
//api creation
//to post data
app.post('/api/addmovies',async (req,res)=>{
    console.log(req.body);
    var data = await movieModel(req.body);
    data.save();
    res.send({status:"movie added"})
})

//view data
app.get('/api/viewmovies',async(req,res)=>{
    var data=await movieModel.find();
    res.json(data);
})
//to delete data
app.delete('/api/deletemovies/:id',async(req,res)=>{
    console.log("delete")
    console.log(req.params)
    let id=req.params.id;
    await movieModel.findByIdAndDelete(id);
    res.json({status:"deleted"})

})

//to update
app.put('/api/edit/:id',async(req,res)=>{
    let id = req.params.id
    try{
        await movieModel.findByIdAndUpdate(id,req.body)
        res.json({status:"updated"})
    }
    catch(err){
        res.status(500).send(err)
    }
    })
    app.get('/*',function(req,res){
        res.sendFile(path.join(__dirname,'/build/index.html'));
    });
//4.port
app.listen(3001,()=>{
    console.log("port 3001 is up and running!!!!")
})