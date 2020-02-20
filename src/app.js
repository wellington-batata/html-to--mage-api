import express from 'express';
import routes from './routes';
import "babel-dotenv";
class App {
  constructor() {
    this.startup();
    this.middlwares();
    this.routes();
  }

  middlwares() {
    this.server.use(express.json());
  }

  startup(){
    this.server = express();
    console.log('Server (ok)');
  }

  routes(){
    this.server.use(routes);
    console.log('Rotas (ok)');
  }
}

export default new App().server;
