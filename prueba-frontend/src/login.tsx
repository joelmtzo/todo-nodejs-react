import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await axios.post("http://localhost:9090/api/auth/login", { email, password });

            const { token } = res.data;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            navigate("/tasks");
        } catch (err) {
            setError(err.response?.data?.message || "Error en el inicio de sesión");
        }
    };

    return (
        <div className="container">
            <div className="col-6 mx-auto">
                <h2 className="my-5">Iniciar sesión</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="form-group mb-2">
                        <input className="form-control" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group mb-2">
                        <input className="form-control" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="btn btn-success" type="submit">Iniciar sesión</button>
                </form>
                <Link to={"/register"}>Registrar nueva cuenta</Link>
            </div>
        </div>
    );
};

export default Login;
