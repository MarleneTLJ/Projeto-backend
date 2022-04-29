const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  client: {
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
      price: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
      },
    },
  ],
  value_paid: Number,
  createdAt: Date,
});

module.exports = mongoose.model("Sale", saleSchema);
