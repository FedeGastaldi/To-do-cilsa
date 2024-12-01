import React, { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask, editTask } from "./services/api";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    getTasks().then((response) => setTasks(response.data));
  }, []);

  const addTask = () => {
    if (newTask.trim()) {
      createTask(newTask).then((response) => {
        setTasks([...tasks, response.data]);
        setNewTask("");
      });
    }
  };

  const toggleTask = (id, estado) => {
    updateTask(id, !estado).then(() => {
      setTasks(tasks.map((task) =>
        task.id === id ? { ...task, estado: !estado } : task
      ));
    });
  };

  const removeTask = (id) => {
    deleteTask(id).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditedTaskName(task.nombre);
  };

  const saveEdit = () => {
    editTask(editingTask, editedTaskName).then(() => {
      setTasks(tasks.map((task) =>
        task.id === editingTask ? { ...task, nombre: editedTaskName } : task
      ));
      setEditingTask(null);
      setEditedTaskName("");
    });
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditedTaskName("");
  };

  const pendingTasks = tasks.filter((task) => !task.estado);
  const completedTasks = tasks.filter((task) => task.estado);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6 flex flex-col items-center">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mb-6 px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
        >
          {darkMode ? "Modo Claro" : "Modo Oscuro"}
        </button>

        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-6">Lista de Tareas</h1>

          <div className="mb-6">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Nueva tarea"
              className="p-2 border border-gray-300 rounded w-full mb-2 dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
            />
            <button
              onClick={addTask}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-transform transform hover:scale-105"
            >
              Agregar
            </button>
          </div>

          <div className="flex flex-wrap gap-6 justify-center">
            <div className="w-full">
              <h2 className="text-2xl font-semibold mb-4">Tareas Pendientes</h2>
              <ul>
                {pendingTasks.map((task) => (
                  <li
                    key={task.id}
                    className="p-4 bg-gray-200 dark:bg-gray-800 mb-2 rounded shadow break-words"
                  >
                    {editingTask === task.id ? (
                      <>
                        <input
                          value={editedTaskName}
                          onChange={(e) => setEditedTaskName(e.target.value)}
                          className="w-full p-2 border rounded dark:bg-gray-700"
                        />
                        <div className="mt-2 flex justify-end gap-2">
                          <button
                            onClick={saveEdit}
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-transform transform hover:scale-105"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-transform transform hover:scale-105"
                          >
                            Cancelar
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <span>{task.nombre}</span>
                        <div className="mt-2 flex justify-end gap-2">
                          <button
                            onClick={() => toggleTask(task.id, task.estado)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-transform transform hover:scale-105"
                          >
                            Completar
                          </button>
                          <button
                            onClick={() => startEditing(task)}
                            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-transform transform hover:scale-105"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => removeTask(task.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-transform transform hover:scale-105"
                          >
                            Eliminar
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <h2 className="text-2xl font-semibold mb-4">Tareas Completadas</h2>
              <ul>
                {completedTasks.map((task) => (
                  <li
                    key={task.id}
                    className="p-4 bg-gray-200 dark:bg-gray-800 mb-2 rounded shadow break-words"
                  >
                    <span className="line-through">{task.nombre}</span>
                    <div className="mt-2 flex justify-end gap-2">
                      <button
                        onClick={() => toggleTask(task.id, task.estado)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-transform transform hover:scale-105"
                      >
                        Pendiente
                      </button>
                      <button
                        onClick={() => removeTask(task.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-transform transform hover:scale-105"
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
