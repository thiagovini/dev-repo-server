import { Router } from "express";

import auth from "./middlewares/auth";
import HelloController from "./controllers/HelloController";
import RepositoriesController from "./controllers/RepositoriesController";
import UsersController from "./controllers/UsersController";
import SessionContoller from "./controllers/SessionContoller";

const routes = new Router();

routes.post("/session", SessionContoller.create)
routes.get("/hello", HelloController.index);

routes.use(auth)

routes.get("/users", UsersController.index);
routes.get("/users/:id", UsersController.show);
routes.post("/users", UsersController.create);
routes.put("/users/:id", UsersController.update);
routes.delete("/users/:id", UsersController.destroy);

routes.get("/users/:user_id/repositories", RepositoriesController.index);
routes.post("/users/:user_id/repositories", RepositoriesController.create);
routes.delete("/users/:user_id/repositories", RepositoriesController.destroy);

export default routes;
