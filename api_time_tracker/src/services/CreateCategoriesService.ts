import prismaClient from "../prisma";

class CreateCategoriesService {
  async execute(title: string, src: string, color: string) {
    const category = await prismaClient.category.create({
      data: {
        title,
        src,
        color,
      },
    });

    return category;
  }
}

export { CreateCategoriesService };
