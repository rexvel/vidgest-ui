import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Button } from "@/components/Button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/NavigationMenu";
import { useMenuState } from '@/hooks/useMenuState';
import MobileNavbar from './MobileNavbar';

const Navbar: React.FC = () => {
  const { isOpen, setIsOpen, toggleMenu } = useMenuState();

  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-100 text-gray-800 p-4 shadow-md">
      <div className="flex items-center justify-between">
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-10 w-10"
              }
            }}
          />
        </SignedIn>
        <button
          className="sm:hidden text-gray-800 focus:outline-none z-50"
          onClick={toggleMenu}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      <div className={`fixed inset-0 bg-gray-100 z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out sm:hidden`}>
        <div className="flex flex-col h-full justify-center items-center">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col items-center space-y-8">
              <SignedIn>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <button onClick={() => handleNavigation('/home')} className="text-2xl hover:text-blue-600 transition-colors duration-200">
                      Home
                    </button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <button onClick={() => handleNavigation('/history')} className="text-2xl hover:text-blue-600 transition-colors duration-200">
                      History
                    </button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </SignedIn>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <button onClick={() => handleNavigation('/about')} className="text-2xl hover:text-blue-600 transition-colors duration-200">
                    About
                  </button>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <SignedOut>
                <NavigationMenuItem>
                  <Button variant="outline" onClick={() => handleNavigation('/home')} className="text-2xl hover:bg-blue-600 hover:text-white transition-colors duration-200">
                    Sign In
                  </Button>
                </NavigationMenuItem>
              </SignedOut>
            </NavigationMenuList>
          </ NavigationMenu >
        </div>
      </div>

     <MobileNavbar />
    </nav>
  );
}

export default Navbar;