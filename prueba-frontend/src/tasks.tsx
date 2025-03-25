import { useEffect, useState } from "react";
import { Task } from "./model/task.model";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskText, setTaskText] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const navigate = useNavigate();

    const apiUrl = "http://localhost:9090/api/tasks";

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }

                axios.defaults.headers.common["Authorization"] = `${token}`;
                const response = await axios.get(apiUrl);
                setTasks(response.data);
            } catch (err) {
                setError("Error al cargar las tareas");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const addTask = async () => {
        if (!taskText.trim()) return;

        const newTask: Task = { id: 0, title: taskText, status: "0" };

        const response = await axios.post(apiUrl, newTask);

        if (response.status === 201) {
            const createdTask = { ...newTask, id: response.data.id };
            setTasks([...tasks, createdTask]);
            setTaskText("");
        }
    };

    const toggleTask = async (taskId: number) => {
        const response = await axios.put(apiUrl + "/" + taskId);

        if (response.status === 200) {
            setTasks(tasks.map((task: Task) =>
                task.id === taskId ? { ...task, status: "1" } : task
            ));
        }
    };

    const removeTask = async (taskId: number) => {
        const response = await axios.delete(apiUrl + "/" + taskId);

        if (response.status === 200) {
            setTasks(tasks.filter((task: Task) => task.id !== taskId));
        }
    };

    const doLogout = () => {
        console.log("en logout")
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
            <h2 className="py-5">Mis Tareas</h2>
            {loading && <p>Cargando...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="form-group row">
                <input
                    type="text"
                    className="form-control"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    placeholder="Nueva tarea..."
                />
                <button className="btn btn-success" onClick={addTask}>Agregar</button>
            </div>

            {tasks.length === 0 ? (
                <p className="py-5">No tienes tareas registradas</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0, marginTop: "30px" }}>
                    {tasks.map((task) => (
                        <li key={task.id} className="d-flex justify-content-between" style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                            <span>
                                <span>{task.title} ({task.status === "0" ? "Pendiente" : "Completada"})</span>
                            </span>
                            <span>
                                <button
                                    onClick={() => toggleTask(task.id)}
                                    className="btn btn-success">T</button>
                                <button
                                    onClick={() => removeTask(task.id)}
                                    className="btn btn-danger">X</button>
                            </span>
                        </li>
                    ))}
                </ul>
            )}

            <p className="btn btn-danger" onClick={doLogout}>Cerrar sesión</p>
        </div>
    );
};

export default Tasks;
