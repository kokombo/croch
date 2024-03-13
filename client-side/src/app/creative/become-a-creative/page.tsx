"use client";

import { Logo, NavAccount } from "@/components";

const CreativeAccountSetup = () => {
  return (
    <div>
      <nav className="flex items-center justify-between py-[18px] px-[4.6%] border-b-[1px] border-grey">
        <Logo />

        <NavAccount onClick={() => {}} opened={false} />
      </nav>

      <section>
        <span></span>

        <div></div>
      </section>

      <section>
        <div></div>

        <div></div>
      </section>
    </div>
  );
};

export default CreativeAccountSetup;
