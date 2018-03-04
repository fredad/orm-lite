const Sequelize = require('sequelize');

class Orm{
  constructor(conString, tableName){
    this.tableName = tableName;
    this.sequelize = this.initialize(conString),
    this.model = this.createModel(this.tableName);
    this.authenticate = this.authenticate();
  }

  initialize(conString){
    return new Sequelize(conString);
  }

  authenticate(){
      this.sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
  }

  createModel(tablename){
    console.log('creating table with '+ tablename);
    return this.sequelize.define(tablename, {
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING},
    {freezeTableName: true});
  }

  getAll(cb){
    this.model.sync();
    this.model.findAll().then(function(rows) {
       var data = [];
       for(var i = 0; i < rows.length; i++) {
         data.push(rows[i].dataValues);
       }
       console.log(data);
       return cb(data);
    });
  }

  findById(id, cb){
    this.model.findAll({
      where: {
        id: id
      }
    }).then(function(rows) {
       var data = [];
       for(var i = 0; i < rows.length; i++) {
         data.push(rows[i].dataValues);
       }
       console.log(data);
       return cb(data);
    });
  }
}

module.exports = Orm;
