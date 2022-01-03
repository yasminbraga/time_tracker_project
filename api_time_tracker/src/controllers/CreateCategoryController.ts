import { Request, Response } from "express";
import { CreateCategoriesService } from "../services/CreateCategoriesService";

class CreateCategoryController {
  async handle(request: Request, response: Response) {
    const { title, src, color } = request.body;

    try {
      const service = new CreateCategoriesService();
      const result = await service.execute(title, src, color);
      return response.json(result);
    } catch (error) {
      console.error(error);
    }
  }
}

export { CreateCategoryController };
