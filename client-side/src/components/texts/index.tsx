export const H1 = () => {
  return <h1></h1>;
};

export const H2 = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="text-xl lg:text-3xl font-bold text-customblack">
      {children}{" "}
    </h2>
  );
};

export const H3 = ({ children }: { children: React.ReactNode }) => {
  return (
    <h3 className="text-lg lg:text-xl font-bold text-customblack">
      {children}{" "}
    </h3>
  );
};

export const H4 = ({ children }: { children: React.ReactNode }) => {
  return (
    <h4 className="text-base lg:text-lg font-bold text-customblack">
      {children}
    </h4>
  );
};

export const H5 = ({
  children,
  extraClasses,
}: {
  children: React.ReactNode;
  extraClasses?: string;
}) => {
  return (
    <h5
      className={`${extraClasses} font-medium text-customblack text-sm lg:text-base`}
    >
      {children}
    </h5>
  );
};

export const H6 = ({
  children,
  extraClasses,
}: {
  children: React.ReactNode;
  extraClasses?: string;
}) => {
  return (
    <h6
      className={` ${extraClasses} font-medium text-customblack text-xs sm:text-sm`}
    >
      {children}
    </h6>
  );
};

export const P = () => {
  return <p></p>;
};

export const SpanText = () => {
  return <span></span>;
};

// const Texts = { H1, H2, H3, H4, H5, H6, P, SpanText };
// export default Texts;
