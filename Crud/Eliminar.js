const { connectDB } = require('./Connection');

async function eliminarVenta(id) {
    let connection;

    try {
        if (!id || isNaN(id) || id <= 0) {
            return { success: false, mensaje: "Error: ID no válido." };
        }
        connection = await connectDB();
        const [filas] = await connection.execute(
            "SELECT id FROM ventas WHERE id = ?", 
            [id]
        );

        if (filas.length === 0) {
            return { success: false, mensaje: "Error: La venta no existe." };
        }
        await connection.execute(
            "DELETE FROM ventas WHERE id = ?", 
            [id]
        );
        return { success: true, mensaje: "Venta eliminada correctamente." };
    } catch (err) {
        console.error("Error al eliminar:", err);
        return { success: false, mensaje: "Error interno al eliminar" };
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

module.exports = { eliminarVenta };
