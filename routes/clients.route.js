const express = require("express");
const router = require("express").Router();
const Client = require("../models/Client");

// Retorna todos os clientes no banco de dados
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.json({ message: err });
  }
});

// Registra um cliente
router.post("/", async (req, res) => {
  const client = new Client({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    cpf: req.body.cpf,
  });

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
    const client = await Client.findById(req.params.clientId);
    res.json(client);
  } catch (err) {
    res.json({ message: err });
  }
});

// Deleta um cliente
router.delete("/:clientId", async (req, res) => {
  try {
    const removedClient = await Client.remove({ _id: req.params.clientId });
    res.json(removedClient);
  } catch (err) {
    res.json({ message: err });
  }
});

// Atualiza um cliente
router.put("/:clientId", async (req, res) => {
    try {
      const updatedClient = await Client.updateOne(
        { _id: req.params.clientId },
        {
          $set: {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            cpf: req.body.cpf,
          },
        }
      );
      res.json(updatedClient);
    } catch (err) {
      res.json({ message: err });
    }
  });
  
  module.exports = router;