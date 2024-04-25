import getToken from "@/middleware/getToken";
import { Prisma, User } from "@prisma/client";

type SelectUser = Prisma.UserGetPayload<{
  select: { username: true; id: true };
}>;

const UserDropDown: React.FC = async () => {
  const user: SelectUser = await getUser();
  return <p>{user.username}</p>;
};

const getUser = async () => {
  const id = getToken();

  const baseUrl = process.env.NEXT_PUBLIC_URL || "";
  const response = await fetch(`${baseUrl}/api/getUser?id=${id}`);

  if (!response.ok) {
    throw new Error("An Error has occured");
  }

  const { user } = await response.json();

  return user;
};
export default UserDropDown;
