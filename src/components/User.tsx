"use client";

import { useSession } from "next-auth/react";

export default function User() {
  const { data: session } = useSession();
  console.log(session?.user);
  return <div>{JSON.stringify(session?.user)}</div>;
}
