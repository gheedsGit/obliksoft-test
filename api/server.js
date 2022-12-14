"use strict";

const app = require("express")();
const fs = require("fs");
let tasksContainer = null;
try {
  tasksContainer = JSON.parse(
    fs.readFileSync(__dirname + "/tasks.json", "utf8")
  );
} catch (err) {
  tasksContainer = { tasks: [] };
}
const cors = require("cors");
const bodyParser = require("body-parser");

const jsonBodyParser = bodyParser.json();

app.use(cors());

/**
 * GET /tasks
 *
 * Return the list of tasks with status code 200.
 */
app.get("/tasks", (req, res) => {
  return res.status(200).json(tasksContainer);
});

/**
 * Get /task/:id
 *
 * id: Number
 *
 * Return the task for the given id.
 *
 * If found return status code 200 and the resource.
 * If not found return status code 404.
 * If id is not valid number return status code 400.
 */
app.get("/task/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!Number.isNaN(id)) {
    const task = tasksContainer.tasks.find((item) => item.id === id);

    if (task !== null) {
      return res.status(200).json({
        task,
      });
    } else {
      return res.status(404).json({
        message: "Not found.",
      });
    }
  } else {
    return res.status(400).json({
      message: "Bad request.",
    });
  }
});

/**
 * POST /task/update/
 *
 * id: Number
 * title: string
 * description: string
 *
 * Update the task with the given id.
 * If the task is found and update as well, return a status code 204.
 * If the task is not found, return a status code 404.
 * If the provided id is not a valid number return a status code 400.
 */
app.post("/task/update", jsonBodyParser, (req, res) => {
  const id = parseInt(req.body?.id, 10);

  if (!Number.isNaN(id)) {
    const task = tasksContainer.tasks.find((item) => item.id === id);

    if (task !== null) {
      task.title = req.body.title;
      task.description = req.body.description;
      return res.status(204);
    } else {
      return res.status(404).json({
        message: "Not found",
      });
    }
  } else {
    return res.status(400).json({
      message: "Bad request",
    });
  }
});

/**
 * POST /task/create
 *
 * title: string
 * description: string
 *
 * Add a new task to the array tasksContainer.tasks with the given title and description.
 * Return status code 201.
 */
app.post("/task/create", jsonBodyParser, (req, res) => {
  const task = {
    id: Date.now(),
    title: req.body?.title,
    description: req.body?.description,
  };

  if (
    tasksContainer?.tasks?.find(
      (_task) =>
        _task?.title === task?.title && _task?.description === task?.description
    )
  ) {
    return res.status(403).json({
      message: "Resource exist",
    });
  }
  tasksContainer?.tasks?.push(task);

  fs.writeFile("tasks.json", JSON.stringify(tasksContainer), "utf-8", (err) => {
    if (err) {
      return console.error(err);
    }
    console.log("FILE UPDATED SUCCESS");
  });

  return res.status(201).json({
    task,
  });
});

/**
 * DELETE /task/delete/:id
 *
 * id: Number
 *
 * Delete the task linked to the  given id.
 * If the task is found and deleted as well, return a status code 204.
 * If the task is not found, return a status code 404.
 * If the provided id is not a valid number return a status code 400.
 */
app.delete("/task/delete/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!Number.isNaN(id)) {
    const task = tasksContainer.tasks.find((item) => item.id === id);

    if (task) {
      const taskIndex = tasksContainer.tasks;
      tasksContainer.tasks.splice(taskIndex, 1);

      fs.writeFile(
        "tasks.json",
        JSON.stringify(tasksContainer),
        "utf-8",
        (err) => {
          if (err) {
            return console.error(err);
          }
          console.log("FILE UPDATED SUCCESS");
        }
      );

      return res.status(200).json({
        message: "Updated successfully",
      });
    } else {
      return res.status(404).json({
        message: "Not found",
      });
    }
  } else {
    return res.status(400).json({
      message: "Bad request",
    });
  }
});

app.listen(9001, () => {
  process.stdout.write("the server is available on http://localhost:9001/\n");
});
