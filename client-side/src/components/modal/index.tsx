import Image from "next/image";
import type { StaticImageData } from "next/image";
import { Divider, H3 } from "..";
import { useLockBodyScroll } from "@/utilities/hooks/useLockBodyScroll";

type Props = {
  children: React.ReactNode;
  onClickModalButton: () => void;
  icon: string | StaticImageData;
  closeModal: () => void;
  label: string;
  isModalOpen: boolean;
};

const Modal = (props: Props) => {
  const closeModal = () => {
    props.closeModal();
    document.body.style.overflow = "auto";
  };

  useLockBodyScroll(props.isModalOpen);

  if (!props.isModalOpen) return null;

  return (
    <div
      onClick={closeModal}
      onKeyDown={() => {}}
      className="fixed top-0 left-0 flex items-start justify-center w-full h-screen md:px-0 px-5 z-[9999] bg-modalblack"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onKeyDown={() => {}}
        className="bg-white z-1 h-fit rounded-xl w-[98vw] sm:w-[70vw] md:w-[65vw] lg:w-[45vw] mt-12 py-4 lg:py-6 modal"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="px-5 md:px-10 flex items-center justify-between w-full ">
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

          <div className="w-8" />
        </div>
        <div className="mt-2 lg:mt-4">
          <Divider />
        </div>

        <div
          className="max-w-full overflow-y-scroll px-5 pt-5 pb-12 md:px-10"
          style={{ scrollbarWidth: "thin" }}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
