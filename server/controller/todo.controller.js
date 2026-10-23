import todos from "../model/todo.model.js";

export const createTodo = async (req, res) => {
  try {
    const { task } = req.body;
    if (!task || !task.trim()) {
      return res.status(400).json({ message: "Task is required" });
    }

    const todo = await todos.create({ task, user: req.userId });
    return res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTodos = async (req, res) => {
  try {
    const allTodos = await todos.find({ user: req.userId, isDeleted: false });
    return res.json(allTodos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;

    // 1. Fetch original document to get its user ID
    const existingTodo = await todos.findById(id);
    if (!existingTodo)
      return res.status(404).json({ message: "Todo not found" });

    // 2. Perform full replacement including the required user ID
    const todo = await todos.findOneAndReplace(
      { _id: id },
      {
        task,
        user: existingTodo.user,
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        runValidators: true,
      },
    );

    return res.json(todo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const toggleTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await todos.findById(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    todo.isFinished = !todo.isFinished;
    await todo.save();

    return res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await todos.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
    return res.json({ message: "Todo successfully deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
