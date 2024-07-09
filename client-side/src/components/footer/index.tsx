import Link from "next/link";
import { H4, H6 } from "..";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray">
      <div className="paddingX grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 py-10 border-grey border-y-[1px]">
        {links.map((item, index) => {
          const { heading, subLinks } = item;
          return (
            <div key={index.toString()} className="flex flex-col gap-6">
              <H4>{heading} </H4>

              <div className="flex flex-col gap-4">
                {subLinks.map((link, index) => {
                  return (
                    <Link
                      key={index.toString()}
                      href={link.href}
                      className="text-customblack text-sm lg:text-base hover:underline"
                    >
                      {link.linkLabel}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="paddingX py-4">
        <span className="flex items-center gap-6">
          <H6>&copy;{year} Croch inc.</H6>

          <H6>
            <Link href="">Privacy</Link>
          </H6>

          <H6>
            <Link href="">Terms & Conditions</Link>
          </H6>
        </span>

        <span />
      </div>
    </footer>
  );
};

export default Footer;

const links = [
  {
    heading: "Useful links",
    subLinks: [
      { linkLabel: "Sign up", href: "/" },
      { linkLabel: "Login", href: "/" },
      { linkLabel: "Login", href: "/" },
    ],
  },

  {
    heading: "Creative",
    subLinks: [
      { linkLabel: "Sell your creatives", href: "/" },
      { linkLabel: "Creative resources", href: "/" },
      { linkLabel: "Creative FAQs", href: "/" },
    ],
  },

  {
    heading: "Customer",
    subLinks: [
      { linkLabel: "Find products", href: "/" },
      { linkLabel: "Your list", href: "/" },
      { linkLabel: "Your list", href: "/" },
    ],
  },

  {
    heading: "Croch",
    subLinks: [
      { linkLabel: "In the media", href: "/" },
      { linkLabel: "Careers", href: "/" },
      { linkLabel: "Investors", href: "/" },
    ],
  },

  {
    heading: "Support",
    subLinks: [
      { linkLabel: "Help center", href: "/" },
      { linkLabel: "Contact us", href: "/" },
      { linkLabel: "Report an issue", href: "/" },
    ],
  },
];
