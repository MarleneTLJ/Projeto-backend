const express = require("express");
const router = require("express").Router();
const Client_Info = require("../models/Client_Info");
const { verifyToken } = require("../controllers/auth.controller");

// Retorna todos os clientes no banco de dados
router.get("/", async (req, res) => {
  try {
    const clients = await Client_Info.find();
    res.json(clients);
  } catch (err) {
    res.json({ message: err });
  }
});

// Registra um cliente
router.post("/", verifyToken, async (req, res) => {
  const client = new Client_Info(req.body);

  try {
    const savedClient = await client.save();
    res.send(savedClient);
  } catch (err) {
    res.json({ message: err });
  }
});

// Retorna um cliente específico pelo id
router.get("/:clientId", async (req, res) => {
  try {
    const client = await Client_Info.findById(req.params.clientId);
    res.json(client);
  } catch (err) {
    res.json({ message: err });
  }
});

// Deleta um cliente
router.delete("/:clientId", verifyToken, async (req, res) => {
  try {
    const removedClient = await Client_Info.deleteMany({ _id: req.params.clientId });
    res.json(removedClient);
  } catch (err) {
    res.json({ message: err });
  }
});

// Atualiza um cliente
router.put("/:clientId", verifyToken, async (req, res) => {
  try {
    const updatedClient = await Client_Info.updateOne(
      { _id: req.params.clientId },
      {
        $set: req.body
      }
    );
    res.json(updatedClient);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;