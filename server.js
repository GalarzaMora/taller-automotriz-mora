const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;


// Middleware
app.use(cors());
app.use(express.json());


// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));


// Conexión a MongoDB
const MONGO_URI = 'mongodb+srv://Galmora:Galarzamora2102@asistentev.x11wlp2.mongodb.net/AsistenteMora?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// Esquema
const RegistroSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  telefono: String,
  aceptarPromociones: Boolean,
  fechaRegistro: { type: Date, default: Date.now }
});

const Registro = mongoose.model('Registro', RegistroSchema, 'RegistrosClientes');

// Ruta de API
app.post('/api/registro', async (req, res) => {
  
  try {
    const nuevo = new Registro(req.body);
    await nuevo.save();
    res.status(201).json({ mensaje: 'Registrado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar en la base de datos' });
  }
});

// index.html 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
