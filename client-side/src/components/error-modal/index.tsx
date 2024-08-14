import { useSelector } from "react-redux";
import { H5 } from "../texts";
import type { StateType } from "@/redux/store";
import { createPortal } from "react-dom";

const ErrorModal = () => {
  const { isErrorModalOpen, errorMessage } = useSelector(
    (state: StateType) => state.modal
  );

  return (
    isErrorModalOpen &&
    createPortal(
      <div className="fixed left-1 bottom-10 card z-[100] h-fit w-[350px]">
        <H5> {errorMessage}</H5>
      </div>,
      document.body
    )
  );
};

export default ErrorModal;
