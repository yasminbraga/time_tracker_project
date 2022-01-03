import prismaClient from "../prisma";

const today = new Date();
const endDay = new Date(today.setHours(20, 59, 59));
const beginDay = new Date(today.setHours(-3, 0, 0, 0));

class DashboardServive {
  async execute(user_id: string) {
    let dashboardData = await prismaClient.task.groupBy({
      where: {
        user_id,
        date: {
          gte: beginDay,
          lte: endDay,
        },
      },
      by: ["category_id"],
      _sum: {
        hours: true,
      },
    });

    let results = dashboardData.map(async (data) => {
      const categoriesData = await prismaClient.category.findFirst({
        where: { id: data.category_id },
      });
      const joinData = {
        ...data,
        title: categoriesData.title,
        src: categoriesData.src,
        color: categoriesData.color,
      };

      return joinData;
    });

    let newResults = await Promise.all(results);

    return newResults;
  }
}

export { DashboardServive };
