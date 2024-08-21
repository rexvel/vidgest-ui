import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Button } from "@/components/Button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/NavigationMenu";

const MobileNavbar: React.FC = () => {
  return (
    <NavigationMenu className="hidden sm:block">
      <NavigationMenuList className="flex items-center justify-end space-x-8">
        <SignedIn>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/home" className="hover:text-blue-600 transition-colors duration-200">
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/history" className="hover:text-blue-600 transition-colors duration-200">
                History
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </SignedIn>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/about" className="hover:text-blue-600 transition-colors duration-200">
              About
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <SignedOut>
          <NavigationMenuItem>
            <Link to="/home">
              <Button variant="outline" className="hover:bg-blue-600 hover:text-white transition-colors duration-200">
                Sign In
              </Button>
            </Link>
          </NavigationMenuItem>
        </SignedOut>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MobileNavbar;