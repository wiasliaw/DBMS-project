import { Client } from 'pg';
import { Data } from './data';
import config from './config';

const client = new Client(config.db);
client.connect((err) => {
  console.log('CONNECT: ', err);
});

/**
 * INSERT 10 data into each table
 */

Data.user.forEach((ele:any) => {
  const query = {
    text: 'INSERT INTO project.user VALUES($1, $2, $3, $4, $5, $6, $7);',
    values: ele,
  };
  client.query(query, (err, res) => {
    if (err) console.error(err.stack);
    else console.log(res.rowCount);
  });
});

Data.page.forEach((ele:any) => {
  const query = {
    text: 'INSERT INTO project.page VALUES($1, $2, $3);',
    values: ele,
  };
  client.query(query, (err, res) => {
    if (err) console.error(err.stack);
    else console.log(res.rowCount);
  });
});

Data.level.forEach((ele:any) => {
  const query = {
    text: 'INSERT INTO project.level VALUES($1, $2, $3, $4, $5);',
    values: ele,
  };
  client.query(query, (err, res) => {
    if (err) console.error(err.stack);
    else console.log(res.rowCount);
  });
});

Data.content.forEach((ele:any) => {
  const query = {
    text: 'INSERT INTO project.content VALUES($1, $2, $3, $4, $5);',
    values: ele,
  };
  client.query(query, (err, res) => {
    if (err) console.error(err.stack);
    else console.log(res.rowCount);
  });
});

Data.friend.forEach((ele:any) => {
  const query = {
    text: 'INSERT INTO project.friend VALUES($1, $2, $3);',
    values: ele,
  };
  client.query(query, (err, res) => {
    if (err) console.error(err.stack);
    else console.log(res.rowCount);
    if (ele === Data.friend[Data.friend.length - 1]) client.end();
  });
});
