import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './login.tsx';
import Register from './register.tsx';
import Tasks from './tasks.tsx';

createRoot(document.getElementById('root')!).render(
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/tasks" element={<Tasks />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </Router>,
)
