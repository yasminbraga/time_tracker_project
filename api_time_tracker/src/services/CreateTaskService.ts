import prismaClient from "../prisma";

class CreateTaskService {
  async execute(
    hours: number,
    user_id: string,
    category_id: string,
    date: Date
  ) {
    const task = prismaClient.task.create({
      data: {
        hours,
        date,
        user_id,
        category_id,
      },
      include: {
        category: true,
        user: true,
      },
    });

    return task;
  }
}

export { CreateTaskService };
