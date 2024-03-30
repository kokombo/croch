import SectionHeading from "../section-heading";

const WhyUs = () => {
  const card = "h-[380px] bg-ash2 rounded-xl";

  return (
    <section className="px-[8%] py-16 flex_col_center gap-10">
      <SectionHeading
        heading1="Why Croch"
        heading2="We've created a space where creativity blossoms"
        heading3="we’re a vibrant platform woven together by a shared love for the art of crochet."
      />

      <div className="grid grid-rows-2 gap-4 w-full">
        <div className="grid grid-cols-10 gap-4 ">
          <div className={`col-span-4 ${card}`}></div>
          <div className={`col-span-6 ${card}`}></div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className={`${card}`}></div>
          <div className={`${card}`}></div>
          <div className={`${card}`}></div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
