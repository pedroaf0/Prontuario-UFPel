const http = require("http");
const express = require("express");
const crypto = require("crypto");
const db = require('./database/db');

const app = express();
const port = process.env.PORT || 3333;
app.set('port', port);

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions) 
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


const server = http.createServer(app);

app.get('/',async (req, res) => {
  
 const name  = "Prontuário-UFPel";
 const version = "1.0.0";
 const build = "success"
  return res.json( { name, version, build } ); 
 
 });

app.use(express.json());

app.get('/teste-retonar/:CPF',async (req, res) => { 
  
  return res.json( await db('users').where('CPF', req.params.CPF).select('*')); 
 
 });
 
 app.post('/retonar/',async (req, res) => {
   
   const { CPF } = req.body;

  return res.json( await db('users').where('CPF', CPF).select('*')); 
 
 });

app.post('/Criar_paciente', async (req, res) => {
  console.log(req.body);
  const {
      CPF,
      Nome,
      Tipo_documento,
      RG,
      Orgao_expedidor,
      RS,
      Dt_emissao,
      Dt_nascimento,
      Nacionalidade,
      Naturalidade,
      Estado_civil,
      Sexo,
      Nome_mae,
      Nome_pai,
      Cor_raca,
      Paciente_com_necessidade_especial,
      Condicao_especial,
      Endereco_tipo,
      CEP,
      Endereco,
      Numero,
      Complemento,
      Bairro,
  } = req.body;

  const id = crypto.randomBytes(4).toString('HEX');
 
  await db('pacientes').insert({
      CPF,
      Nome,
      Tipo_documento,
      RG,
      Orgao_expedidor,
      RS,
      Dt_emissao,
      Dt_nascimento,
      Nacionalidade,
      Naturalidade,
      Estado_civil,
      Sexo,
      Nome_mae,
      Nome_pai,
      Cor_raca,
      Paciente_com_necessidade_especial,
      Condicao_especial,
      Endereco_tipo,
      CEP,
      Endereco,
      Numero,
      Complemento,
      Bairro,
  });

  return res.json({ id });
});



console.log("api escutando em http://localhost:"+port)
server.listen(port);

