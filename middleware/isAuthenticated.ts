import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const isAuthenticated = () => {
  const secret = process.env.JWT_SECRET || "";

  const cookie = cookies().get("token");

  if (!cookie) {
    return false;
  }

  const token = cookie.value || "";

  try {
    jwt.verify(token, secret);
    return true;
  } catch {
    //TODO Delete cookie
    return false;
  }
};

export default isAuthenticated;
