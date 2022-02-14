const { sequelize } = require('../../src/app/models');

module.exports = () => {
  return Promise.all(Object.keys(sequelize.models).map(key => {
    return sequelize.models[key].destroy({ 
      truncate: true, 
      force: true 
    })
  }));
};

// Percorre cada tabela e limpa os dados. 
// Promise.all -> encapsula toda a resposta em uma unica promisse