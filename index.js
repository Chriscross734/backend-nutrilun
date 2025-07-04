const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/dietas'));
const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root',
  password: '',
  database: 'nutrilun_app',
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos');
});


const ejerciciosRoutes = require('./routes/ejercicios');
const planesRoutes = require('./routes/planes');


app.use('/api/ejercicios', ejerciciosRoutes);
app.use('/api/planes', planesRoutes); // antes era /rutinas
// Rutas
const authRoutes = require('./routes/auth')(db);
app.use('/api/auth', authRoutes);

const perfilRoutes = require('./routes/perfil');
app.use('/api/perfil', perfilRoutes);

const rutinasRouter = require('./routes/rutinas');
app.use('/api/rutinas', rutinasRouter);

const dietasRoutes = require('./routes/dietas');

const asignacionRoutes = require('./routes/asignacion');
app.use('/asignacion', asignacionRoutes);

const comidasRoutes = require('./routes/comidas');
app.use('/api/comidas', comidasRoutes);

const usuariosRoutes = require('./routes/usuarios');
app.use('/api', usuariosRoutes);

const caloriasRoutes = require('./routes/calorias');
app.use('/api/calorias', require('./routes/calorias'));

app.use('/api/chat', require('./routes/chat'));







const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
