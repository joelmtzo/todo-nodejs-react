import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [success, setSuccess] = useState<null | string>(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const res = await axios.post("http://localhost:9090/api/auth/register", formData);

        if(res.status === 201) {
            setSuccess("Usuario registrado correctamente, ya puedes iniciar sesión.");
        }
    };

    return (
        <div className="container">
            <div className="col-6 mx-auto">
                <h2 className="my-5">Registro</h2>
                {success && <p style={{ color: "red" }}>{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input className="form-control mb-2" type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input className="form-control mb-2" type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input className="form-control mb-2" type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button className="btn btn-success" type="submit">Registrarse</button>
                </form>
                <Link to={"/login"}>Ya tiene una cuenta? Inicie sesión</Link>
            </div>
        </div>
    );
};

export default Register;
