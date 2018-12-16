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
    },
  password: {
      type: String,
      trim: true
    }
});



module.exports = mongoose.model('Registration', registrationSchema);

