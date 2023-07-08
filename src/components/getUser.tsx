"use client";

import { useSession } from "next-auth/react";

const getUser = () => {
  const { data: session } = useSession();
  return session?.user;
};

export default getUser;
