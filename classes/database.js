const mysql = require('mysql2');
const Sequelize = require('sequelize');
require('dotenv').config();
class Database{
  constructor(database,user,password,host){
    this.database = database;
    this.user = user;
    this.password = password;
    this.host     = host;
  }

  connect(){
      return  new Sequelize(this.database,this.user,this.password,{
            host:this.host,
            dialect: 'mysql',

            pool: {
              max: 5,
              min: 0,
              acquire: 30000,
              idle: 10000
            }
          });

      }//connectDb
  }
//
var connectDb = new Database(process.env.DATABASE,process.env.user,process.env.PASSWORD,process.env.HOST);
var db = connectDb.connect();

db.authenticate()
 .then(() => {
   console.log('Connection has been established successfully.');
 })
 .catch(err => {
   console.error('Unable to connect to the database:', err);
 });

module.exports = db;
