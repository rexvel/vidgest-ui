import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Button } from "@/components";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/NavigationMenu";
import { useMenuState } from '@/hooks/useMenuState';

export const Sidebar: React.FC = () => {
  const { isOpen, setIsOpen, toggleMenu } = useMenuState();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
      <aside className="fixed ml-16 top-0 left-0 flex flex-col mt-24 p-4 pt-16">
        <div className="flex items-center justify-between mb-8">
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10"
                }
              }}
            />
          </SignedIn>
        </div>
        <NavigationMenu orientation="vertical" className="flex-grow">
          <NavigationMenuList className="flex flex-col space-y-4">
            <SignedIn>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <button onClick={() => handleNavigation('/home')} className="text-xl">
                    Home
                  </button>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <button onClick={() => handleNavigation('/history')} className="text-xl">
                    History
                  </button>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </SignedIn>
            <SignedOut>
              <NavigationMenuItem>
                <Button variant="outline" onClick={() => handleNavigation('/home')} className="">
                  Sign In
                </Button>
              </NavigationMenuItem>
            </SignedOut>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <button onClick={() => handleNavigation('/about')} className="text-xl hover:text-blue-600 transition-colors duration-200">
                  About
                </button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </aside>
  );
}
