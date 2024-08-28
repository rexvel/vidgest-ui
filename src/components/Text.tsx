import React from 'react';

interface TextProps {
  text?: string;
}

const Text: React.FC<TextProps> = ({ text = 'Vidgest' }) => {
  return (
    <div className="text-[#030303] text-[22px] font-montserrat font-bold leading-[30px]">
      {text}
    </div>
  );
};

export default Text;