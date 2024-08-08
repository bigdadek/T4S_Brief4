const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email:String,
 password:String
});


userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});


module.exports = mongoose.model('User', userSchema);
