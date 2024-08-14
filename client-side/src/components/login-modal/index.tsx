import { setOpenLoginModal } from "@/redux/slices/modal";
import type { DispatchType, StateType } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { icons } from "@/constants";
import { createPortal } from "react-dom";
import Modal from "../modal";
import LoginForm from "../forms/login-form";

const LoginModal = () => {
  const { isLoginModalOpen } = useSelector((state: StateType) => state.modal);
  const dispatch: DispatchType = useDispatch();

  const closeLoginModal = () => {
    dispatch(setOpenLoginModal(false));
  };

  return createPortal(
    <Modal
      closeModal={closeLoginModal}
      onClickModalButton={closeLoginModal}
      icon={icons.close}
      label="Log in"
      isModalOpen={isLoginModalOpen}
    >
      <LoginForm />
    </Modal>,
    document.body
  );
};

export default LoginModal;
