const { Client } = require('pg');
const client = new Client({
  user: 'postgres',
  host: 'postgres',
  password: 'cfgcmapy',
  database: 'project',
  port: 5432,
});
client.connect((err) => {
  if (err) console.log('CONNECT: ', err);
});

/**
 * take easy look into db
 */
const table = [
  'project.user',
  'project.page',
  'project.level',
  'project.content',
  'project.friend',
];

table.forEach((tb) => {
  const query = {
    text: `SELECT * FROM ${tb}`,
  };
  client.query(query, (err, res) => {
    if(err) console.error(err.stack);
    else console.log(`TABLE - ${tb} -\n`, res.rows);
    if(tb == table[table.length-1]) client.end();
  });
});
