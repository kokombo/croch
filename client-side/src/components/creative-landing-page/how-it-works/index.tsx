import { H3, H6 } from "@/components";
import SectionHeading from "../section-heading";

const HowItWorks = () => {
  return (
    <section className="px-[8%] py-16 flex_col_center gap-10 bg-ash2">
      <SectionHeading
        heading1="How it works"
        heading2="Ready To Turn Yarn Into Gold"
        heading3="Whether you're a seasoned crochet artist or just starting, croch is your canvas to showcase, sell, and connect"
      />

      <div className="grid grid-cols-3 gap-4">
        {data.map((item, index) => {
          return (
            <article
              key={index}
              className="bg-white h-[400px] rounded-xl px-4 py-6 flex flex-col justify-between"
            >
              <div />

              <span className="flex flex-col gap-3">
                <H3>{item.heading} </H3>

                <H6>{item.subheading} </H6>
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;

const data = [
  {
    heading: "Sign up",
    subheading:
      "Create your account in just a few quick and easy steps. It takes only minutes to set up and unlock a world of possibilities.",
  },
  {
    heading: "Construct your page",
    subheading:
      "Upload high-quality images of your creations. Set prices, add descriptions, and let your awesome art speak for itself",
  },
  {
    heading: "Start selling",
    subheading:
      "Once created, your page and your creations goes live. sit back, relax and watch your creations find new homes ",
  },
];
