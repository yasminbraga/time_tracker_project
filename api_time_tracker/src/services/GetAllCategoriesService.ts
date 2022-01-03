import prismaClient from "../prisma";

class GetAllCategoriesService {
  async execute() {
    const categories = prismaClient.category.findMany();
    return categories;
  }
}

export { GetAllCategoriesService };
