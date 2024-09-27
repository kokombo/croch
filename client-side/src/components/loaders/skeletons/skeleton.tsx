import "./skeleton.css";

const Skeleton = ({ className }: { className: string }) => {
  const classNames = `skeleton animate-pulse ${className}`;
  return <div className={classNames} />;
};

export default Skeleton;
