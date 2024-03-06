import mysql from 'mysql2';
 
const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'enchere',
  port: 3307
};
 
 
const connection = mysql.createConnection(config);
 
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database!');
  }
});
 
export {
  connection
}

