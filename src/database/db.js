// importar dependência sqlite 3
const sqlite3 = require("sqlite3").verbose();

//iniciar bd
 const db = new sqlite3.Database("./src/database/database.db");

 module.exports = db;

//  //utilizar o bd para operacoes
//  db.serialize(() => {
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//      `);
//     const query = `
//                         INSERT INTO places (
//                             image,
//                             name,
//                             address,
//                             address2,
//                             state,
//                             city,
//                             items
//                         ) VALUES (?,?,?,?,?,?,?);
//                     `;
//     const values = [
//         "imagem",
//         "Colectoria2",
//         "Guilherme Gemballa, Jardim América2",
//         "2602",
//         "São Paulo2",
//         "Aparecida do Norte2",
//         "Resíduos Eletrônicos, Lâmpadas2"
//      ];
    
//     function afterInsertData(err) {
//         if(err) {
//             return console.log(err);
//         }
//         console.log("Cadastrado com sucesso");
//         console.log(this);
//     }

//     db.run(query, values, afterInsertData);
//  });