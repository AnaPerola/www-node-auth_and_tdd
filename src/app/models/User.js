const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    //Datatypes.Virtual é criado apenas model nao aparece na DB
    password: DataTypes.VIRTUAL,
    password_hash: DataTypes.STRING,
  },{
    hooks: {
      // toda vez antes de salvar vou setar uma valor para este campo
      beforeSave: async user => {
        if (user.password) {
          user.password_hash = await bcrypt.hash(user.password, 8);
        }
      }
    }
  });
  //prototype define novo metodo para o model User
  //método checkPassword é uma validação de senha
  User.prototype.checkPassword = function(password) {
    return bcrypt.compare(password, this.password_hash)
  }
  //não foi utilizado Arrow function, pois é necessário ter acesso ao this/instanciar o usuario no controller
  return User;
}