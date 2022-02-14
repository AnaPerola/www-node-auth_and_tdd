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
const factory = require('../factories');
const truncate = require('../utils/truncate');

describe('Authentication', () => {
  // beforeAll() executa ANTES de todos os testes
  // beforeEach() executa ANTES de cada um
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credentials', async () => { 
    const user = await factory.create('User', {
      password: '123123'
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
    const user = await factory.create('User', {
      password: '123123'
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
    const user = await factory.create('User', {
      password: '123123'
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123'
      })

    expect(response.body).toHaveProperty('token')
  })

  it('should be able to access private routes when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123123'
    })

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`)

    expect(response.status).toBe(200);
  });

  it('should not be able to access private routes without jwt token', async () => {
    const user = await factory.create('User', {
      password: '123123'
    })

    const response = await request(app)
      .get('/dashboard')

    expect(response.status).toBe(401);
  });

  it('should not be able to access private routes with invalid jwt token', async () => {
    const user = await factory.create('User', {
      password: '123123'
    })

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer 123123`)

    expect(response.status).toBe(401);
  });
})