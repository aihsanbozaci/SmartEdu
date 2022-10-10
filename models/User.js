const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
//password crypt
UserSchema.pre('save',function (next){
  const user = this;
  bcrypt.hash(user.password,10, (error, hash)=>{
    user.password = hash;
    next();
  })
})
const User = mongoose.model("User", UserSchema);
module.exports = User;
