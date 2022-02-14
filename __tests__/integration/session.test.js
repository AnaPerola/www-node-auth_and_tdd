// Teste tem q ter um nome legível = SER OBVIO SOBRE O QUE SE REFERE
// o it na função significa em ingles = ISSO 

// ACABA FAZENDO PARTE DA SENTENÇA EX:
// ==> it('should receibe JWT token when authenticated with valid credentials', () => {
//     });
// describe é como se fosse uma categoria dos testes

// describe('Register', () => {
//   it('', () => {
//   });
// })
// 1° teste
// describe('Authentication', () => {
//   it('should sum two numbers', () => {
//     const x = 2;
//     const y = 2;
    
//     const sum = x + y;

//     expect(sum).toBe(4);
//   });
// })

//SEMPRE FAZEMOS O NOSSO TESTE PASSAR MESMO QUE ESTEJA RETORNANDO UMA RESPOSTA ESTATICA DO CONTROLLER
const request = require('supertest');

const app = require('../../src/app');
const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('Authentication', () => {
  // beforeAll() executa ANTES de todos os testes
  // beforeEach() executa ANTES de cada um
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credentials', async () => { 
    const user = await User.create({
      name: 'Ana',
      email: 'anaperolinha@hotmail.com',
      password: '123123',
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123'
      })

    expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid credentials', async() => {
    const user = await User.create({
      name: 'Ana',
      email: 'anaperolinha@hotmail.com',
      password_hash: '123123',
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      })

  expect(response.status).toBe(401);
  })

  it('should return jwt token when authenticated', async() => {
    const user = await User.create({
      name: 'Ana',
      email: 'anaperolinha@hotmail.com',
      password_hash: '123123',
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      })

    expect(response.body).toHaveProperty('token')
  })
})