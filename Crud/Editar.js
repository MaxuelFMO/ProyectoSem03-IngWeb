const { connectDB } = require("../Back/Connection");

async function editarVenta(datos) {
  let connection;
  try {
    connection = await connectDB();
    const { id, cliente, producto, cantidad, precio } = datos;

    // Validación de datos
    if (!id || !cliente || !producto || !cantidad || !precio) {
      throw new Error("Faltan datos requeridos");
    }

    const total = cantidad * precio;
    const query = `
      UPDATE ventas
      SET cliente = ?, producto = ?, cantidad = ?, precio = ?, total = ?
      WHERE id = ?
    `;
    const [result] = await connection.execute(query, [
      cliente,
      producto,
      cantidad,
      precio,
      total,
      id,
    ]);

    if (result.affectedRows === 0) {
      throw new Error("No se encontró la venta con el ID proporcionado");
    }

    console.log(`✅ Venta con ID ${id} actualizada correctamente`);
    return true;
  } catch (err) {
    console.error("❌ Error al editar venta:", err.message);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (e) {
        console.error("Error al cerrar conexión:", e.message);
      }
    }
  }
}

module.exports = { editarVenta };
