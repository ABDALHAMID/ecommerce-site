const mysql = require('mysql2');
const db = mysql.createConnection({
   host: 'localhost',
   user:'root',
   password:'',
   database:'ecomerce_site',
   port:3306
})
// const db = mysql.createConnection({
//      host: 'sql201.epizy.com',     
//      user:'epiz_32888382',
//      password:'xtNnSHbpuqkT',
//      database:'epiz_32888382_copagStore',
//  })
module.exports = db;