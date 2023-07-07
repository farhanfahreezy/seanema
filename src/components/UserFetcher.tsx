import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

interface UserSession {
  name: string;
  username: string;
  birthday: Date;
  balance: string;
}

interface UserFetcherProps {
  children: ({ user }: { user: UserSession | null }) => JSX.Element;
}

export default async function UserFetcher({ children }: UserFetcherProps) {
  const session = await getServerSession(authOptions);

  const user = session?.user as UserSession;

  // Pass the user data as props to the child components
  return children({ user });
}
