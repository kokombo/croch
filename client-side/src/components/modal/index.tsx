import Image, { StaticImageData } from "next/image";

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
      className="fixed top-0 left-0 flex items-start md:justify-center w-full h-full bg-black md:px-0 px-5 z-[9999] bg-modalblack"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white z-1 h-fit rounded-[10px] w-[45%] mt-12 py-6 modal"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="px-10 flex items-center justify-between w-full ">
          <button
            type="button"
            onClick={props.onClickModalButton}
            className="hover:bg-gray h-10 w-10 rounded-full flex items-center justify-center"
          >
            <Image
              src={props.icon}
              alt="modal header icon"
              width={32}
              height={32}
            />
          </button>

          <p className=" text-xl font-bold">{props.label} </p>

          <div className="w-8"></div>
        </div>

        <div className="border-b-[1px] border-grey w-full mt-6"></div>

        <div
          className="max-w-full overflow-y-scroll h-[70vh] p-10"
          style={{ scrollbarWidth: "thin" }}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
