export const H1 = () => {
  return <h1></h1>;
};

export const H2 = () => {
  return <h2></h2>;
};

export const H3 = ({ children }: { children: React.ReactNode }) => {
  return <h3 className="text-xl font-bold text-customblack">{children} </h3>;
};

export const H4 = () => {
  return <h4></h4>;
};

export const H5 = () => {
  return <h5></h5>;
};

export const H6 = ({ text }: { text: string }) => {
  <h6 className="font-semibold text-customblack text-sm">{text}</h6>;
};

export const P = () => {
  return <p></p>;
};

export const SpanText = () => {
  return <span></span>;
};

// const Texts = { H1, H2, H3, H4, H5, H6, P, SpanText };
// export default Texts;
