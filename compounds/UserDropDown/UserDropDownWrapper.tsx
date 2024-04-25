import getToken from "@/middleware/getToken";
import UserDropDown from "./UserDropDown";
import isAuthenticated from "@/middleware/isAuthenticated";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const UserDropDownWrapper = async () => {
  const logUserOut = async () => {
    "use server";
    cookies().delete("token");
  };

  const deleteUser = async () => {
    "use server";
    if (!isAuthenticated) {
      throw new Error("You are not authorized");
    }
    const id = getToken();

    const baseUrl = process.env.NEXT_PUBLIC_URL || "";
    const response = await fetch(`${baseUrl}/api/deleteUser?id=${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("An Error has occured");
    }

    await logUserOut();
    redirect("/");
  };

  if (!isAuthenticated()) {
    redirect("/");
  }

  const user = await getUser();
  return (
    <UserDropDown user={user} outlogger={logUserOut} deleter={deleteUser} />
  );
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

export default UserDropDownWrapper;
