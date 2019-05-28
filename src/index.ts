import app from './app';

console.info(`Server Start on ${process.env.PORT}`);
app.listen(process.env.PORT);
