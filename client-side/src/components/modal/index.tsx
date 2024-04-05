import Image, { StaticImageData } from "next/image";
import { Divider, H3 } from "..";

type Props = {
  children: React.ReactNode;
  onClickModalButton: () => void;
  icon: string | StaticImageData;
  closeModal: () => void;
  label: string;
};

const Modal = (props: Props) => {
  const closeModal = () => {
    props.closeModal();

    document.body.style.overflow = "auto";
  };

  return (
    <div
      onClick={closeModal}
      className="fixed top-0 left-0 flex items-start justify-center w-full h-full md:px-0 px-5 z-[9999] bg-modalblack"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white z-1 h-fit rounded-[10px] w-[98vw] sm:w-[70vw] lg:w-[45vw] mt-12 py-4 lg:py-6 modal"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="px-5 lg:px-10 flex items-center justify-between w-full ">
          <button
            type="button"
            onClick={props.onClickModalButton}
            className="hover:bg-gray h-10 w-10 rounded-full flex items-center justify-center"
          >
            <Image
              src={props.icon}
              alt="modal header icon"
              width={28}
              height={28}
              loading="eager"
            />
          </button>

          <H3>{props.label}</H3>

          <div className="w-8"></div>
        </div>

        <div className="mt-2 lg:mt-4">
          <Divider />
        </div>

        <div
          className="max-w-full overflow-y-scroll h-[55vh] sm:h-[65vh] lg:h-[70vh] px-5 py-5 lg:px-10"
          style={{ scrollbarWidth: "thin" }}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
