import prismaClient from "../prisma";

class ProfileUserService {
  async execute(user_id) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      include: {
        tasks: true,
      },
    });

    return user;
  }
}

export { ProfileUserService };
