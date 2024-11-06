const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const manufacturerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Please provide company name'],
    minlength: 3,
    maxlength: 50,
  },
  registrationNumber: {
    type: String,
    required: [true, 'Please provide registration number'],
    unique: true,
  },
  businessEmail: {
    type: String,
    required: [true, 'Please provide business email'],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
  },
  address: {
    type: String,
    required: [true, 'Please provide business address'],
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
}, { timestamps: true });

// Hash password before saving
manufacturerSchema.pre('save', async function() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('Manufacturer', manufacturerSchema);
