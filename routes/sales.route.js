const express = require("express");
const router = require("express").Router();
const Sale = require("../models/Sale");

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
router.post("/", async (req, res) => {
  const sale = new Sale(req.body);

  console.log(req.body);
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
router.delete("/:saleId", async (req, res) => {
  try {
    const removedSale = await Sale.remove({ _id: req.params.saleId });
    res.json(removedSale);
  } catch (err) {
    res.json({ message: err });
  }
});

// Atualiza uma compra
router.put("/:saleId", async (req, res) => {
  try {
    const updatedSale = await Sale.updateOne(
      { _id: req.params.saleId },
      {
        $set: {
          client: {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            cpf: req.body.cpf,
          },
          course: [
            {
              title: req.body.title,
              workload: req.body.workload,
              price: req.body.price,
              description: req.body.description,
            },
          ],
          value_paid: req.body.value_paid,
        },
      }
    );
    res.json(updatedSale);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
