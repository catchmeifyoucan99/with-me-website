import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '../../store/auth/modalSlice.jsx';

const useModal = () => {
  const dispatch = useDispatch();
  const { isOpen, modalType } = useSelector((state) => state.modal);

  const showModal = (type) => {
    if (modalType !== type || !isOpen) {
      dispatch(openModal(type));
    }
  };

  const hideModal = () => {
    dispatch(closeModal());
  };

  return {
    showModal, //main function to show modal
    hideModal, // function to hide modal
    isOpen, // boolean to check if modal is open from redux
    modalType, // type of modal to show isOpen from redux
  };
};

export default useModal;
