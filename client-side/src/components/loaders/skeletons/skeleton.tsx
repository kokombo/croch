import "./skeleton.css";

const Skeleton = ({ classes }: { classes: any }) => {
  const classNames = `skeleton animate-pulse ${classes}`;
  return <div className={classNames}></div>;
};

export default Skeleton;
