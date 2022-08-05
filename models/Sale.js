const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  client: {
    _id: { type: mongoose.ObjectId, required: true },
    name: {
      type: String,
      required: true,
      min: 3,
      max: 255,
    },
    surname: {
      type: String,
      required: true,
      min: 3,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    cpf: {
      type: Number,
      required: true,
    },
  },
  courses: [
    {
      title: {
        type: String,
        required: true,
        min: 3,
        max: 255,
      },
      workload: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  value_paid: {
    type: Number,
    required: true
  },
  thing: Number,
  user_logued: {
    _id: { type: mongoose.ObjectId, required: true },
    name: { type: String, required: true },
    roles: {
      admin: { type: String },
      basic: { type: String },
    },
  },
  createdAt: Date,
});

module.exports = mongoose.model("Sale", saleSchema);
