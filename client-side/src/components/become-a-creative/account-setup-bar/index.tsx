import DropDown from "@/components/drop-down";
import { NavAccountButton } from "@/components/buttons";
import { signOut } from "next-auth/react";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  showDropDown: boolean;
  setShowDropDown: Dispatch<SetStateAction<boolean>>;
};

const AccountSetupBar = (props: Props) => {
  return (
    <nav className="nav_container">
      <div />

      <div className="relative">
        <NavAccountButton
          onClick={() => {
            props.setShowDropDown((prev) => !prev);
          }}
          opened={props.showDropDown}
        />

        {props.showDropDown && (
          <DropDown extraClasses="right-0 mt-2">
            <Link
              href={"/signout"}
              className="text-sm font-medium hover:bg-gray px-5 py-3"
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              Sign Out
            </Link>
          </DropDown>
        )}
      </div>
    </nav>
  );
};

export default AccountSetupBar;
