import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
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
    <aside className="w-64 xl:w-72 2xl:w-80 3xl:w-96 4xl:w-112 flex-shrink-0 pt-8">
      <NavigationMenu orientation="vertical">
        <NavigationMenuList className="flex flex-col space-y-4 xl:space-y-6 2xl:space-y-8">
          <SignedIn>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <button onClick={() => handleNavigation('/home')} className="group flex w-full items-start gap-3 rounded-[64px] p-1 text-coco-grey hover:text-coco-black">
                  <span className="text-base font-bold group-hover:text-coco-black group-data-[active]:text-coco-black pt-3">Home</span>
                </button>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <button onClick={() => handleNavigation('/history')} className="group flex w-full items-start gap-3 rounded-[64px] p-1 text-coco-grey hover:text-coco-black">
                  <span className="text-base font-bold group-hover:text-coco-black group-data-[active]:text-coco-black pt-3">History</span>
                </button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </SignedIn>
          <SignedOut>
            <NavigationMenuItem>
              <Button variant="outline" onClick={() => handleNavigation('/home')} className="group flex w-full items-start gap-3 rounded-[64px] p-1 text-coco-grey hover:text-coco-black">
                <span className="text-base font-bold group-hover:text-coco-black group-data-[active]:text-coco-black pt-3">Sign In</span>
              </Button>
            </NavigationMenuItem>
          </SignedOut>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <button onClick={() => handleNavigation('/about')} className="group flex w-full items-start gap-3 rounded-[64px] p-1 text-coco-grey hover:text-coco-black">
                <span className="text-base font-bold group-hover:text-coco-black group-data-[active]:text-coco-black pt-3">About</span>
              </button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </aside>
  );
}