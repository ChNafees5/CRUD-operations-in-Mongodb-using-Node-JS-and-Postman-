
var mongoose =require('mongoose');
const express = require('express');
const app = express();
var mongoDB = 'mongodb://localhost:27017/newdb';

mongoose.connect( mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});  
var db = mongoose.connection;


db.on('error', (error) => {console.error(error)});
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => { console.log('connect to database')});
app.use(express.json())

 const sechme={
    name :String,
    email:String,
    id:Number
 }
 const mondele=mongoose.model("NEWCOL",sechme)

 app.post("/post",async(req,res)=>{
    console.log('you are inside the post')
    const data = new mondele({
      name:req.body.name,
      email:req.body.email,
      id:req.body.id
    })
    const val=await data.save();
    res.json(val);
 })
 app.put("/update/:id", async(req,res)=>{
   let upid=req.params.id;
   let upname=req.body.name;
   let upemail=req.body.email;
   //find
   mondele.findOneAndUpdate({id:upid},{$set:{name:upname,email:upemail}},{new:true},(err,data)=>{
      if (data==null){
         res.send("nothing to fund")
      }
      else{
         res.send(data)
      }
   } )
 })
//fetch data get
app.get("/fetch/:id",function(req,res){
   fetchid=req.params.id;
   mondele.find(({id:fetchid}),function(err,val){
      if (val.length==0){
         res.send("data is not exist")
      }
      else{
         res.send(val)
      }
    
   })
}
)
//delete by id 
app.delete("/del/:id", function(req,res){
   let delt=req.params.id;
   mondele.findOneAndDelete(({id:delt}), function(err, docs){
      if (docs==null){
         res.send("data is not exist")
      }
      else{
      res.send(docs);
   }   })
})

app.listen(3000, () => { console.log('Connection is setup')})