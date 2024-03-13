import { signOut } from "next-auth/react";

const Footer = () => {
  return (
    <footer>
      <button type="button" onClick={() => signOut()}>
        Sign out
      </button>
    </footer>
  );
};

export default Footer;
