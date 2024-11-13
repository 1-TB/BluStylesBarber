const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  lastVisit: { type: Date },
  nextVisit: { type: Date }
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);
export default Client;