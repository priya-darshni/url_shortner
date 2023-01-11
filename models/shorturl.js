const mongoose=require('mongoose')
const shortId=require('shortid')

const shortURLSchema=new mongoose.Schema({
  orignal:{
    type: String,
    required: true
  },
  short:{
    type: String,
    required: true,
    default: shortId.generate
  },
  clicks:{
    type: Number,
    required: false,
    default: 0
  }
})
module.exports=mongoose.model('shorturl',shortURLSchema);
