import { twMerge } from "tailwind-merge";

export const H2 = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="text-xl lg:text-3xl font-bold text-customblack">
      {children}
    </h2>
  );
};

export const H3 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={twMerge(
        className,
        "text-lg lg:text-xl font-bold text-customblack"
      )}
    >
      {children}
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
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h5
      className={twMerge(
        className,
        "font-medium text-customblack text-sm lg:text-base"
      )}
    >
      {children}
    </h5>
  );
};

export const H6 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h6
      className={twMerge(
        className,
        "font-medium text-customblack text-xs sm:text-sm"
      )}
    >
      {children}
    </h6>
  );
};
