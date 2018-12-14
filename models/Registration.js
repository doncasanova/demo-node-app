const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const registrationSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('Registration', registrationSchema);


//const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

//let ProductSchema = new Schema({
//    name: { type: String, required: true, max: 100 },
//    price: { type: Number, required: true },
//});


// Export the model
//module.exports = mongoose.model('Product', ProductSchema);