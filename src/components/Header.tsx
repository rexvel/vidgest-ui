import React from 'react';
import Text from './Text';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-10 shadow-sm">
      <div className="w-full flex justify-between items-center py-4 px-6">
        <div className="ml-16"> {/* Add left margin to avoid collision with sidebar */}
          <Text />
        </div>
      </div>
    </header>
  );
};

export default Header;