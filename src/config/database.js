const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://js4551373_db_user:LRLVXWRdygQaN5DK@cluster0.dfxvbao.mongodb.net/";
async function connectDatabase() {
  await mongoose.connect(MONGO_URL, { dbName: "alunos" });
  console.log("MongoDB conectado com sucesso");
}

module.exports = connectDatabase;
