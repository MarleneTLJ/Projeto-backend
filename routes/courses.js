const express = require("express");
const router = require("express").Router();
const Course = require("../models/Course");

// Retorna todos os cursos no banco de dados
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.json({ message: err });
  }
});

// Registra um curso
router.post("/", async (req, res) => {
  const course = new Course({
    title: req.body.title,
    workload: req.body.workload,
    price: req.body.price,
    description: req.body.description,
  });

  try {
    const savedCourse = await course.save();
    res.send(savedCourse);
  } catch (err) {
    res.json({ message: err });
  }
});

// Retorna um curso específico pelo id
router.get("/:courseId", async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    res.json(course);
  } catch (err) {
    res.json({ message: err });
  }
});

// Deleta um curso
router.delete("/:courseId", async (req, res) => {
  try {
    const removedCourse = await Course.remove({ _id: req.params.courseId });
    res.json(removedCourse);
  } catch (err) {
    res.json({ message: err });
  }
});

// Atualiza um curso
router.patch("/:courseId", async (req, res) => {
  try {
    const updatedCourse = await Course.updateOne(
      { _id: req.params.courseId },
      {
        $set: {
          title: req.body.title,
          workload: req.body.workload,
          price: req.body.price,
          description: req.body.description,
        },
      }
    );
    res.json(updatedCourse);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
