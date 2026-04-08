const { connectDB } = require('../Back/Connection');

async function insertarVenta(datos) {
  let connection;
  try {
    connection = await connectDB();
    const { cliente, producto, cantidad, precio } = datos;
    
    // Validación de datos
    if (!cliente || !producto || !cantidad || !precio) {
      throw new Error('Faltan datos requeridos');
    }
    
    const total = cantidad * precio;
    const query = 'INSERT INTO ventas (cliente, producto, cantidad, precio, total) VALUES (?, ?, ?, ?, ?)';
    const [result] = await connection.execute(query, [cliente, producto, cantidad, precio, total]);
    console.log('✅ Venta insertada con ID:', result.insertId);
    return result.insertId;
  } catch (err) {
    console.error('❌ Error al insertar venta:', err.message);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (e) {
        console.error('Error al cerrar conexión:', e.message);
      }
    }
  }


module.exports = { insertarVenta };
