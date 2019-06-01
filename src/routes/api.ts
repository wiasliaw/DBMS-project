import express from 'express';
import admin from '../libs/admin';
/**
 * Router for API interface
 */
function apiroute(adm:admin) {
  const router = express.Router();

  router.get('/admin/:link', (req:express.Request, res:express.Response) => {
    if (req.params['link'] === adm.link) {
      res.render('admin', { auth: req.cookies['Auth'] });
    }
  });

  router.post('/admin', (req:express.Request, res:express.Response) => {
    const admin = req.body['admin'];
    const  password = req.body['password'];
    if (adm.authAdmin(admin, password)) {
      res.cookie('Auth', 'islogin', {
        maxAge: 600000,
      });
      res.redirect(`/admin/${adm.link}`);
    }
    else res.status(403).render('error', { code: 403, msg: 'Login Fail' });
  });

  router.post('/admin/logout', (req:express.Request, res:express.Response) => {
    console.log(req.originalUrl);
    res.clearCookie('Auth');
    res.json({ redirect: `/admin/${adm.link}` });
  });
  return router;
}

export { apiroute as ApiRouter };
