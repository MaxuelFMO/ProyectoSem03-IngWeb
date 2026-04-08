const { connectDB } = require('../Back/Connection');

async function listarVentas() {
  let connection;
  try {
    connection = await connectDB();
    const query = 'SELECT id, cliente, producto, cantidad, precio, total FROM ventas ORDER BY id DESC';
    const [ventas] = await connection.execute(query);
    console.log(`✅ Se listaron ${ventas.length} ventas`);
    return ventas;
  } catch (err) {
    console.error('❌ Error al listar ventas:', err.message);
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
}

module.exports = { listarVentas };