import React from 'react';

interface YouTubeVideoButtonProps {
  onClick: () => void;
}

export const YouTubeVideoButton: React.FC<YouTubeVideoButtonProps> = ({ onClick }) => (
  <div
    className="bg-white rounded-[32px] w-[344px] h-[117px] flex items-center p-4 mb-4 cursor-pointer"
    onClick={onClick}
  >
    <div
      className="w-[73px] h-[72px] bg-cover bg-center bg-no-repeat mr-4"
      style={{
        backgroundImage: `url(https://assets.api.uizard.io/api/cdn/stream/21dd2cdf-057f-4908-91f6-3ace53f43e3b.png)`
      }}
    />
    <div className="text-[#030303] text-[20px] font-montserrat font-bold leading-[29px]">
      YouTube video
    </div>
  </div>
);