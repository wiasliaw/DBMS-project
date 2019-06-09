const { Client } = require('pg');
const Data = require('./data');
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  password: 'cfgcmapy',
  database: 'project',
  port: 8001,
});
client.connect((err) => {
  console.log('CONNECT: ', err);
});

/**
 * INSERT 10 data into each table
 */
Data.user.forEach(data => {
  const query = {
    text: 'INSERT INTO project.user VALUES($1, $2, $3, $4, $5, $6, $7);',
    values: data, 
  }
  client.query(query, (err, res) => {
    if(err) console.error(err.stack);
  });
});

Data.page.forEach(data => {
  const query = {
    text: 'INSERT INTO project.page VALUES($1, $2, $3);',
    values: data, 
  }
  client.query(query, (err, res) => {
    if(err) console.error(err.stack);
  });
});

Data.level.forEach(data => {
  const query = {
    text: 'INSERT INTO project.level VALUES($1, $2, $3, $4, $5);',
    values: data, 
  }
  client.query(query, (err, res) => {
    if(err) console.error(err.stack);
  });
});

Data.content.forEach(data => {
  const query = {
    text: 'INSERT INTO project.content VALUES($1, $2, $3, $4, $5);',
    values: data, 
  }
  client.query(query, (err, res) => {
    if(err) console.error(err.stack);
  });
});

Data.friend.forEach(data => {
  const query = {
    text: 'INSERT INTO project.friend VALUES($1, $2, $3);',
    values: data, 
  }
  client.query(query, (err, res) => {
    if(err) console.error(err.stack);
    if(data==Data.friend[Data.friend.length-1]) client.end();
  });
});
