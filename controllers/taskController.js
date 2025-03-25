const Task = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({
      title,
      description,
      status: status || false,
      userId: req.user.id,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, userId: req.user.id } });

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    task.status = 1;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la tarea" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, userId: req.user.id } });

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    await task.destroy();
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la tarea" });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
