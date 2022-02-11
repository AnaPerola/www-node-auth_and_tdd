module.exports = {
  host:'127.0.0.1',
  username: 'docker',
  password: 'docker',
  database: 'nodeauth',
  dialect: 'postgres',
  operatorsAliases: false,
  logging: false,
  define: {
    timestamps:true,
    underscored: true, //nao criar em CamelCase e sim com _
    underscoredAll: true, //aplica a funcao de cima nos campos tambem
  },
};