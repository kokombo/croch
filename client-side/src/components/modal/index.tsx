import Image, { StaticImageData } from "next/image";

type Props = {
  children: React.ReactNode;
  onClickModalButton: () => void;
  icon: string | StaticImageData;
  closeModal: () => void;
};

const Modal = (props: Props) => {
  return (
    <div
      onClick={props.closeModal}
      className="fixed top-0 left-0 flex items-center md:justify-center w-full h-full bg-black md:px-0 px-5 z-[1000] bg-modalblack"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white z-1 h-fit p-5 overflow-y-scroll rounded-[10px] w-[500px]"
        style={{ scrollbarWidth: "none" }}
      >
        <span className="mt-10">
          <button type="button" onClick={props.onClickModalButton}>
            <Image
              src={props.icon}
              alt="modal header icon"
              width={32}
              height={32}
            />
          </button>
        </span>

        <div className="mt-2 max-w-full">{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
