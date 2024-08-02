const mongoose = require("mongoose");

const urlShortSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  weburl: {
    type: String,
    required: true,
  },
  shortenedUrl: {
    type: String,
   
  },
  clicks:{
    type:Number
  }
  
});
module.exports = mongoose.model("URLShortener", urlShortSchema);