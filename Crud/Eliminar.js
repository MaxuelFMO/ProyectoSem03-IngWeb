const { connectDB } = require('../Back/Connection');

async function eliminarVenta(id) {
  const connection = await connectDB();
}

module.exports = { eliminarVenta };