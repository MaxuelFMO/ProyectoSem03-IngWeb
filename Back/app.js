const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const { insertarVenta } = require('../Data/Crear');

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error interno del servidor');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }else if (req.method === 'POST' && req.url === '/submit') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const datos = querystring.parse(body);
      try {
        const id = await insertarVenta({
          cliente: datos.cliente,
          producto: datos.producto,
          cantidad: parseInt(datos.cantidad),
          precio: parseFloat(datos.precio)
        });
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Venta insertada con ID: ${id}`);
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error al insertar venta');
      }
    });
  } else {
    res.writeHead(404);
    res.end('Página no encontrada');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});