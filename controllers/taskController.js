const db = require('../config/db');

exports.createTask = (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title required" });
    }

    db.query(
        "INSERT INTO tasks (title, description) VALUES (?, ?)",
        [title, description],
        (err, result) => {
            if (err) return res.status(500).json(err);

            res.json({
                message: "Task created",
                id: result.insertId
            });
        }
    );
};

// GET TASKS
exports.getTasks = (req, res) => {
    db.query("SELECT * FROM tasks", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

// UPDATE TASK
exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    db.query(
        "UPDATE tasks SET status=? WHERE id=?",
        [status, id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Task updated" });
        }
    );
};

// DELETE TASK
exports.deleteTask = (req, res) => {
    const { id } = req.params;

    db.query(
        "DELETE FROM tasks WHERE id=?",
        [id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Task deleted" });
        }
    );
};