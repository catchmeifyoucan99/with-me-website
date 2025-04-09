import React, { forwardRef } from 'react';

const ModalStyle = forwardRef(({ children, ask, method, onMethodClick }, ref) => {
  return (
    <div
      ref={ref}
      className="bg-white grid grid-cols-1 lg:grid-cols-2 w-11/12 max-w-6xl h-auto min-h-11/12 rounded-2xl shadow-2xl overflow-hidden"
    >
      {/* Logo */}
      <div className="bg-gray-100 p-8 sm:p-12 flex flex-col justify-between relative h-full">
        <div className="flex text-xl mb-4">Welcome!</div>
        <img
          src="/src/assets/react.svg"
          alt="Logo"
          className="mx-auto my-8 w-24 h-24 sm:w-32 sm:h-32 object-contain"
        />
        <div className="flex items-center justify-center sm:justify-start mt-4">
          <span className="text-sm text-black/80 mr-1">{ask}</span>
          <span
            className="relative text-sm font-medium cursor-pointer after:content-[''] after:block after:w-full after:h-[1px] after:bg-black after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300 hover:after:w-0"
            onClick={onMethodClick}
          >
            {method}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 sm:p-12 flex flex-col justify-center overflow-y-auto scroll-smooth">
        {children}
      </div>
    </div>
  );
});

export default React.memo(ModalStyle);

