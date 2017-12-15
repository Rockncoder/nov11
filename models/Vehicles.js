const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const VehicleSchema = new mongoose.Schema({
  year: String,
  make: String,
  model:String,
  fuelType: String,
  city: Number,
  id: Number,
  highway: Number,
  combined: Number,
});

VehicleSchema.plugin(findOrCreate);

module.exports = mongoose.model('Vehicle', VehicleSchema);
