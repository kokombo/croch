import "./skeleton.css";

const Skeleton = ({ classes }: { classes: string }) => {
  const classNames = `skeleton animate-pulse ${classes}`;
  return <div className={classNames} />;
};

export default Skeleton;
