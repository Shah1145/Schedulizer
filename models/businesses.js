import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  workEmail: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  mapLink: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
    default:
      "Welcome to our busness. We hope you have a wonderful experience with us. We sstrive to provide the best service possible.",
  },
  profile: {
    type: String,
    default: "./public/images/logo.png",
  },
  services: [{ type: mongoose.Types.ObjectId, ref: "Service" }],
});

// Collection part
const Business = mongoose.model("businesses", businessSchema);

export default Business;
