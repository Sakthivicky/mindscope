import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  stressLevel: { type: String, required: false },
  anxietyLevel: { type: String, required: false },
  lifeSatisfaction: { type: String, required: false },
  copingMechanisms: { type: String, required: false },

  sleepQuality: { type: String, required: false },
  emotionalHealth: { type: String, required: false },
  selfCare: { type: String, required: false },
  mentalImpactOnDailyLife: { type: String, required: false },
  physicalHealthImpact: { type: String, required: false },

});




const Report = mongoose.models.Report || mongoose.model('Report', reportSchema);

export default Report;
