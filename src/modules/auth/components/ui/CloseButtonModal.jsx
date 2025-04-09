import React from 'react';
import { IoMdClose } from "react-icons/io";
import useModal from '../../../../core/hooks/auth/useModal.js';

const CloseButtonModal = ({className}) => {
  const {hideModal} = useModal();
  return(
    <div className={`${className} flex size-16 rounded-xl items-center justify-center`} onClick={hideModal}>
      <span className="text-xl"><IoMdClose /></span>
    </div>
  )
}

export default React.memo(CloseButtonModal);