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
    <aside className="w-full md:w-48 xl:w-54 2xl:w-60 3xl:w-72 4xl:w-84 flex-shrink-0 md:pt-8">
    <NavigationMenu orientation="horizontal" className="md:orientation-vertical">
      <NavigationMenuList className="flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-4 xl:space-y-6 2xl:space-y-8 overflow-x-auto md:overflow-x-visible py-4 md:py-0">
        <SignedIn>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <button onClick={() => handleNavigation('/home')} className="group flex items-center md:items-start gap-3 rounded-full p-2 md:p-1 text-coco-grey hover:text-coco-black whitespace-nowrap">
                <span className="text-sm md:text-base font-bold group-hover:text-coco-black group-data-[active]:text-coco-black">Home</span>
              </button>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <button onClick={() => handleNavigation('/history')} className="group flex items-center md:items-start gap-3 rounded-full p-2 md:p-1 text-coco-grey hover:text-coco-black whitespace-nowrap">
                <span className="text-sm md:text-base font-bold group-hover:text-coco-black group-data-[active]:text-coco-black">History</span>
              </button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </SignedIn>
        <SignedOut>
          <NavigationMenuItem>
            <Button variant="outline" onClick={() => handleNavigation('/home')} className="group flex items-center md:items-start gap-3 rounded-full p-2 md:p-1 text-coco-grey hover:text-coco-black whitespace-nowrap">
              <span className="text-sm md:text-base font-bold group-hover:text-coco-black group-data-[active]:text-coco-black">Sign In</span>
            </Button>
          </NavigationMenuItem>
        </SignedOut>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <button onClick={() => handleNavigation('/about')} className="group flex items-center md:items-start gap-3 rounded-full p-2 md:p-1 text-coco-grey hover:text-coco-black whitespace-nowrap">
              <span className="text-sm md:text-base font-bold group-hover:text-coco-black group-data-[active]:text-coco-black">About</span>
            </button>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </aside>
  );
}