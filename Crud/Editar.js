const { connectDB } = require('../Back/Connection');

async function editarVenta(datos) {
  let connection;
  try {
    connection = await connectDB();
    const { id, cliente, producto, cantidad, precio } = datos;
    
    // Validación de datos
    if (!id || !cliente || !producto || !cantidad || !precio) {
      throw new Error('Faltan datos requeridos (id, cliente, producto, cantidad, precio)');
    }
    
    const total = cantidad * precio;
    const query = 'UPDATE ventas SET cliente = ?, producto = ?, cantidad = ?, precio = ?, total = ? WHERE id = ?';
    const [result] = await connection.execute(query, [cliente, producto, cantidad, precio, total, id]);
    
    if (result.affectedRows === 0) {
      throw new Error('Venta no encontrada');
    }
    
    console.log('✅ Venta actualizada con ID:', id);
    return result;
  } catch (err) {
    console.error('❌ Error al editar venta:', err.message);
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


module.exports = { editarVenta };