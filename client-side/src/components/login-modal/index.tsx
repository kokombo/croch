import { setOpenLoginModal } from "@/redux/slices/modal";
import type { DispatchType, StateType } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { icons } from "@/constants";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("../modal"), { ssr: false });
const LoginForm = dynamic(() => import("../forms/login-form"), {
  ssr: false,
});

const LoginModal = () => {
  const { openLoginModal } = useSelector((state: StateType) => state.modal);
  const dispatch: DispatchType = useDispatch();

  const closeLoginModal = () => {
    dispatch(setOpenLoginModal(false));
    document.body.style.overflow = "auto";
  };

  return (
    openLoginModal &&
    createPortal(
      <Modal
        closeModal={closeLoginModal}
        onClickModalButton={closeLoginModal}
        icon={icons.close}
        label="Log in"
      >
        <LoginForm />
      </Modal>,
      document.body
    )
  );
};

export default LoginModal;
