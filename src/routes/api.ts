import { Router, Request, Response } from 'express';
import { Client } from 'pg';

function apiRouter(db:Client) {
  const router = Router();
  router.post('/api/query', (req:Request, res:Response) => {
    const query = req.body['sql'];
    db.query(query, (err, resp) => {
      if (err) {
        console.error(err.stack);
        res.json({ error: err.stack });
      } else {
        res.json({ data: resp.rows });
      }
    });
  });
  return router;
}
export { apiRouter as ApiRouter };
