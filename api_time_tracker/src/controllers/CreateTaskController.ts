import { Request, Response } from "express";
import { CreateTaskService } from "../services/CreateTaskService";

class CreateTaskController {
  async handle(request: Request, response: Response) {
    let { hours, category, date } = request.body;
    const { period } = request.query;
    const { user_id } = request;

    date = new Date(date);

    try {
      const service = new CreateTaskService();

      const result = await service.execute(hours, user_id, category, date);
      return response.json(result);
    } catch (error) {
      console.error(error);
    }
  }
}

export { CreateTaskController };
