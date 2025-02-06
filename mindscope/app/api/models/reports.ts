import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  stressLevel: String,
  anxietyLevel: String,
  mood: String,
  copingMechanisms: String,
  sleepQuality: String,
});

const Report = mongoose.models.Report || mongoose.model('Report', reportSchema);

export default Report;
