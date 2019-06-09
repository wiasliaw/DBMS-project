import { Router, Request, Response } from 'express';
import { PassportStatic } from 'passport';

function authRouter(passport:PassportStatic) {
  const router = Router();
  router.get('/admin', (req:Request, res:Response) => {
    console.log(req.originalUrl);
    res.render('admin', { auth: req.cookies['Auth'] });
  });
  router.post('/admin',
              passport.authenticate('admin', {
                failureRedirect: '/',
              }),
              (req:Request, res:Response) => {
                console.log(req.originalUrl);
                res.cookie('Auth', 'islogin', {
                  maxAge: 1200000,
                });
                res.redirect('/admin');
              },
  );
  router.post('/admin/logout', (req:Request, res:Response) => {
    console.log(req.originalUrl);
    res.clearCookie('Auth');
    res.json({ redirect: '/admin' });
  });
  return router;
}
export { authRouter as AuthRouter };
