const express=require('express');
const app=express()
const mongoose=require('mongoose');
const shorturl=require('./models/shorturl')
mongoose.connect('mongodb+srv://admin-priya:<password>@cluster0.p5ooy.mongodb.net/?retryWrites=true&w=majority/urlshortner',{
  useNewUrlParser : true,
  useUnifiedTopology: true
})

app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}))
app.get('/',async function(req,res){
  const shorturls=await shorturl.find()
  res.render('index',{shorturls: shorturls});
})

app.post('/shorturls',async (req,res)=>{
    await shorturl.create({
      orignal: req.body.ogurl
    })
    res.redirect('/')
})
app.get('/:shorturl',async function(req,res){
  const s=await shorturl.findOne({short:req.params.shorturl})
  if(s==null)return res.sendStatus(404)
  s.clicks++;
  s.save();
  res.redirect(s.orignal)
})

app.listen(process.env.PORT || 3000);
