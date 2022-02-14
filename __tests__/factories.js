const { factory } = require('factory-girl');
const { User } = require('../src/app/models');
// const faker = require('faker');

// factory.define('User', User, {
//   name: faker.name.findName(),
//   email: faker.internet.email(),
//   password: faker.internet.password()
// })

factory.define('User', User, {
  name: 'Ana',
  email: 'anaperolinha@hotmail.com',
  password: '123123' 
})

module.exports = factory;