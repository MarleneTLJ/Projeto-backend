const mongoose = require("mongoose");

const clientInfoSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Client_Info", clientInfoSchema);
