"use client";
import {
  ProductsList,
  TagsList,
  FilterButton,
  Modal,
  LoginForm,
  SignupForm,
} from "@/components";
import { icons } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, StateType } from "@/redux/store";
import { setOpenLoginModal, setOpenSignupModal } from "@/redux/slices/modal";

const Home = () => {
  const { openLoginModal, openSignupModal } = useSelector(
    (state: StateType) => state.modal
  );

  const dispatch: DispatchType = useDispatch();

  return (
    <div className="flex flex-col">
      {openLoginModal && (
        <Modal
          closeModal={() => dispatch(setOpenLoginModal(false))}
          onClickModalButton={() => {
            dispatch(setOpenLoginModal(false));
            document.body.style.overflow = "auto";
          }}
          icon={icons.arrowleft}
        >
          <LoginForm />
        </Modal>
      )}

      {openSignupModal && (
        <Modal
          closeModal={() => dispatch(setOpenSignupModal(false))}
          onClickModalButton={() => {
            dispatch(setOpenSignupModal(false));
            document.body.style.overflow = "auto";
          }}
          icon={icons.arrowleft}
        >
          <SignupForm />
        </Modal>
      )}

      <div className="px-[4.6%] flex items-center gap-4 border-b-[1px] border-grey w-full">
        <TagsList />

        <FilterButton />
      </div>

      <div className="px-[4.6%] py-10">
        <ProductsList />
      </div>
    </div>
  );
};

export default Home;
