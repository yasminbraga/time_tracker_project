import { Request, Response } from "express";
import { DashboardServive } from "../services/DashboardService";

class DashboardController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const service = new DashboardServive();

    const result = await service.execute(user_id);

    return response.json(result);
  }
}

export { DashboardController };
