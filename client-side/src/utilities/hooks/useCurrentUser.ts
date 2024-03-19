import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const { data: session, status } = useSession();

  const sessionExpireTime = session?.expires;

  const id = session?.user.id;

  const accessToken = session?.user.accessToken;

  const accountDisabled = session?.user.accountDisabled;

  const email = session?.user.email;

  const emailVerified = session?.user.emailVerified;

  const firstName = session?.user.firstName;

  const lastName = session?.user.lastName;

  const role = session?.user.role;

  return {
    id,
    accessToken,
    accountDisabled,
    email,
    emailVerified,
    lastName,
    firstName,
    role,
    sessionExpireTime,
    session,
    status,
  };
};
