import express from 'express';
/**
 * Router for User Interface
 */
const router = express.Router();

router.get('/', (req:express.Request, res:express.Response) => {
  console.log(req.originalUrl);
  res.render('hello');
});

export { router as BaseRouter };
