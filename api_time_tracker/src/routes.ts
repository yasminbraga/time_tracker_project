import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateCategoryController } from "./controllers/CreateCategoryController";
import { CreateTaskController } from "./controllers/CreateTaskController";
import { DashboardController } from "./controllers/DashboardController";
import { GetAllCategoriesController } from "./controllers/GetAllCategoriesController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);

router.post("/category", new CreateCategoryController().handle);
router.get("/getCategories", new GetAllCategoriesController().handle);

router.post("/task", ensureAuthenticated, new CreateTaskController().handle);

router.get("/dashboard", new DashboardController().handle);
router.get("/profile", ensureAuthenticated, new ProfileUserController().handle);

export { router };
