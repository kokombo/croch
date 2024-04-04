const OverlayLoader = ({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) => {
  return (
    <div className="fixed w-full h-screen top-0 left-0 grid place-items-center z-[9999] bg-transparentwhite">
      {children}
    </div>
  );
};

export default OverlayLoader;
