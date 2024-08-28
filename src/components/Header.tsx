import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-10 shadow-sm">
      <div className="w-full flex justify-between items-center py-4 px-6">
        <div className="ml-16">
          <div className="text-[#030303] text-[22px] font-montserrat font-bold leading-[30px]">
            Vidgest
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
