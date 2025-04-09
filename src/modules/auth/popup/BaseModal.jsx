import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../core/store/auth/modalSlice.jsx';
import ModalStyle from '../components/ui/ModalStyle.jsx';
import CloseButtonModal from '../components/ui/CloseButtonModal.jsx';
import { debounce } from 'lodash';

const BaseModal = ({ children, title, ask, method, onMethodClick, className}) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const modalRef = useRef(null);
  const [screenSize, setScreenSize] = useState({
    closeButtonInside: window.innerWidth <= 1369,
  });

  const handleClickOutside = useCallback((event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      dispatch(closeModal());
    }
  }, [dispatch]);

  // responsive
  useEffect(() => {
    const handleResize = debounce(() => {
        const width = window.innerWidth;
        setScreenSize({
          closeButtonInside: width <= 1369,
        });
      },100);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, []);

  // closeOutsideModal
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      if (isOpen) {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [isOpen, handleClickOutside]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black/70 flex justify-center items-center overflow-y-auto scroll-smooth ${className}`}>
      <ModalStyle ref={modalRef} ask={ask} method={method} onMethodClick={onMethodClick}>
        <span className="flex text-xl font-medium mb-9">{title}</span>
        {children}

        <CloseButtonModal className={`fixed transition-all duration-300 ${
            screenSize.closeButtonInside
              ? 'top-9 right-4 bg-black hover:bg-black/80 text-white'
              : 'right-9 bottom-10 bg-white/80 hover:bg-white text-black'
          }`}
        />
      </ModalStyle>
    </div>
  );
};

export default React.memo(BaseModal);