import React from 'react';
import { SignedIn, UserButton } from '@clerk/clerk-react';

export const Header: React.FC = () => {
  return (
    <header className="h-16 xl:h-20 bg-white shadow-md z-10">
      <div className="container mx-auto h-full flex items-center justify-between max-w-[1400px] px-4 xl:px-6">
        <div className="text-2xl xl:text-3xl font-bold">Vidgest</div>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-10 w-10 xl:h-12 xl:w-12"
              }
            }}
          />
        </SignedIn>
      </div>
    </header>
  );
};