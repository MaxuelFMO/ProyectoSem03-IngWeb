const { connectDB } = require('../Back/Connection');

async function eliminarVenta(id) {
  let connection;
  try {
    connection = await connectDB();
    if (!id) {
      throw new Error('ID de venta requerido');
    }
    
    const query = 'DELETE FROM ventas WHERE id = ?';
    const [result] = await connection.execute(query, [id]);
    
    if (result.affectedRows === 0) {
      throw new Error('Venta no encontrada');
    }
    
    console.log('✅ Venta eliminada con ID:', id);
    return result;
  } catch (err) {
    console.error('❌ Error al eliminar venta:', err.message);
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
module.exports = { eliminarVenta };