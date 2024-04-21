import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const getToken = () => {
  const secret = process.env.JWT_SECRET || "";

  const cookie = cookies().get("token");

  if (!cookie) {
    throw new Error("Cookie missing");
  }

  const token = cookie.value || "";

  try {
    const decoded = jwt.verify(token, secret);
    const sub = decoded.sub;
    return sub;
  } catch {
    throw new Error("Invalid signature");
  }
};

export default getToken;
