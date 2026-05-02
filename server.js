const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

let tasks = [
  { id: 1, title: 'Belajar JavaScript', done: false },
  { id: 2, title: 'Belajar Node.js', done: false }
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const title = (req.body?.title || '').trim();

  if (!title) {
    return res.status(400).json({ message: 'Title tidak boleh kosong' });
  }

  const newTask = {
    id: Date.now(),
    title,
    done: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  let found = false;

  tasks = tasks.map((task) => {
    if (task.id === id) {
      found = true;
      return { ...task, done: !task.done };
    }

    return task;
  });

  if (!found) {
    return res.status(404).json({ message: 'Task tidak ditemukan' });
  }

  res.json({ message: 'Updated' });
});

app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const initialLength = tasks.length;

  tasks = tasks.filter((task) => task.id !== id);

  if (tasks.length === initialLength) {
    return res.status(404).json({ message: 'Task tidak ditemukan' });
  }

  res.json({ message: 'Deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
