const express = require("express");
const router = require("express").Router();
const Sale = require("../models/Sale");
const { verifyToken } = require('../controllers/auth.controller');

// Retorna todos as compras no banco de dados
router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (err) {
    res.json({ message: err });
  }
});

// Registra uma compra
router.post("/", verifyToken, async (req, res) => {
  const sale = new Sale(req.body);

  try {
    const savedSale = await sale.save();
    return res.send(savedSale);
  } catch (err) {
    res.json({ message: err });
  }
});

// Retorna uma compra específica pelo id
router.get("/:saleId", async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.saleId);
    res.json(sale);
  } catch (err) {
    res.json({ message: err });
  }
});

// Deleta uma compra
router.delete("/:saleId", verifyToken, async (req, res) => {
  try {
    const removedSale = await Sale.deleteMany({ _id: req.params.saleId });
    res.json(removedSale);
  } catch (err) {
    res.json({ message: err });
  }
});

// Atualiza uma compra
router.put("/:saleId", verifyToken, async (req, res) => {
  try {
    const updatedSale = await Sale.updateOne(
      { _id: req.params.saleId },
      {
        $set: req.body
      }
    );
    res.json(updatedSale);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
