const { connectDB } = require('../Back/Connection');

async function listarVentas() {
  const connection = await connectDB();
}

module.exports = { listarVentas };