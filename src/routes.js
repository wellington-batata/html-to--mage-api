import Router from 'express';
import ThumbnailController from './app/controllers/ThumbnailController';

const routes = new Router();

routes.get('/', (req, res) => {
  res.send('ok');
});
routes.post('/thumbnail', ThumbnailController.store);

export default routes;
