import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../store/auth/modalSlice.jsx';
import LoginModal from '../../../../modules/auth/popup/LoginModal.jsx';
import RegisterModal from '../../../../modules/auth/popup/RegisterModal.jsx';
import { debounce } from 'lodash';
import { LuUserRoundCheck } from 'react-icons/lu';

const NavbarActions = () => {

  const dispatch = useDispatch();
  const { isOpen, modalType } = useSelector((state) => state.modal);

  const [screenSize, setScreenSize] = useState({
    isMobile: window.innerWidth <= 570,
  });

  // responsive
  useEffect(() => {
    const handleResize = debounce(() => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width <= 570,
      });
    }, 100);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, []);

  const handleOpenLoginModal = () => {
    dispatch(openModal('login'));
  };

  const handleOpenRegisterModal = () => {
    dispatch(openModal('register'));
  };

  const authMethodChange = (type) => {
    dispatch(openModal(type));
  };

  return(
    <>
      {screenSize.isMobile ?
        <>
          <LuUserRoundCheck size={21} className="ml-2 min-h-[21px] min-w-[21px]" onClick={handleOpenLoginModal}/>
          {isOpen && modalType === 'login' && <LoginModal authMethodChange={() => authMethodChange('register')} />}
          {isOpen && modalType === 'register' && <RegisterModal authMethodChange={() => authMethodChange('login')} />}
        </> :
        <div className="xxl:ml-0 ml-2 font-inter-tight flex items-center gap-3 max-h-[42px]">
          <div className="xxl:pr-4 lg:pr-2 pr-0 gap-3 flex items-center">
            <button onClick={handleOpenLoginModal} className="xl:mr-2 mr-0 text-sm text-primary hover:text-primary/80 text-nowrap">Log in</button>
            {isOpen && modalType === 'register' && <RegisterModal authMethodChange={() => authMethodChange('login')} />}

            <button onClick={handleOpenRegisterModal} className="text-sm text-primary hover:text-primary/80 text-nowrap">Sign Up</button>
            {isOpen && modalType === 'login' && <LoginModal authMethodChange={() => authMethodChange('register')} />}
          </div>

          <div className="flex xxl:ml-2 ml-0 items-center gap-3">
            <button className="lg:ml-0 md:ml-4 sm:flex hidden items-center bg-black text-white px-4 h-[42px] max-h-[42px] text-sm hover:bg-black/80 rounded-lg text-nowrap">Be Pro</button>
            <button className="lg:flex hidden items-center border border-black px-4 h-[42px] max-h-[42px] hover:bg-black/80 hover:text-white text-sm rounded-lg text-nowrap">Submit Website</button>
          </div>
        </div>
      }
    </>
  )
}

export default React.memo(NavbarActions);