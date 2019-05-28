import express from 'express';
import admin from '../libs/admin';
/**
 * Router for API interface
 */
function apiroute(adm:admin) {
  const router = express.Router();
  router.get('/admin/:link', (req:express.Request, res:express.Response) => {
    if (req.params['link'] === adm.link) {
      res.render('admin');
    } else {
      res.status(403).render('error', { code: 403, msg: 'Forbidden' });
    }
  });
  return router;
}

export { apiroute as ApiRouter };
