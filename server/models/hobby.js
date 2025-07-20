const mongoose = require('mongoose');

const hobbySchema = new mongoose.Schema({
  name: String,
  category: String,
  goal: Number,
  icon: String,
  color: String,
  sessions: Number,
  totalHours: Number,
  streak: Number,
  lastSession: String,
  notes: [String]
});

const Hobby = mongoose.model('Hobby', hobbySchema);

function addHobby(hobbies, newHobby) {
  hobbies.push(newHobby);
  return hobbies;
}

// Export both
module.exports = {
  Hobby,
  addHobby
};
