# Proyecto Todo List (Backend y Frontend)

Este es un proyecto full-stack que consta de dos partes: el **backend** (Node.js con Express) y el **frontend** (React). La aplicación permite a los usuarios registrarse, iniciar sesión y gestionar tareas. 

## Estructura del Proyecto

La estructura de carpetas del proyecto es la siguiente:


## Tecnologías Utilizadas

- **Backend**: 
  - Node.js
  - Express
  - MySQL
  - Sequelize ORM
  - JWT para autenticación
- **Frontend**: 
  - React
  - Axios para las solicitudes HTTP
  - React Router para la navegación
- **Base de Datos**:
  - MySQL

## Instalación y Ejecución

### 1. Clonar el repositorio

Clona el repositorio en tu máquina local:

```bash
git clone https://github.com/joelmtzo/todo-nodejs-react.git
```

Desde la raíz del proyecto ejecuta para instalar las dependencias

```bash
npm install
```

Modifica la configuración para la base de datos en el archivo config/config.json

```bash
{
  "development": {
    "username": "root",
    "password": "root",
    "database": "todo_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

Ejecuta las migraciones de Sequelize para crear las tablas en la base de datos

```bash
npx sequelize-cli db:migrate
```

Iniciar el servidor con nodejs

```bash
npm start
```

El servidor backend debería estar corriendo en http://localhost:9090

Nota: el puerto de la aplicación puede ser modificado desde el archivo .env en la raíz del proyecto.

## Frontend

Navega a la carpeta de prueba-frontend

Instala las dependencias de React

```bash
npm install
```

Inicia el servidor de desarrollo de React:

```bash
npm run dev
```

El frontend debería estar corriendo en http://localhost:3000