const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    fullName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Number,
      default: null,
    },
    otpExpire: {
      type: Date,
    },
    resetPassToken : {
      type : String,
    },
    resetExpire : {
      type : Date
    }
  },
  { timestamps: true }
);


// ============= hash password =========
userSchema.pre("save", async function () {
  const user = this;

  // Only hash if the password has been modified or is new
  if (!user.isModified("password")) return;

  try {
    user.password = await bcrypt.hash(user.password, 10);
  } catch (err) {
    console.log(err);
  }
});

// ========= compare password ==============
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};



module.exports = mongoose.model('user',userSchema)
