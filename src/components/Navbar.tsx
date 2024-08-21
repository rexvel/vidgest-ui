import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Button } from "@/components/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/navigation-menu";

function Navbar() {
  return (
    <nav className="bg-gray-100 text-gray-800 p-4 shadow-md">
      <NavigationMenu>
        <NavigationMenuList className="flex flex-col sm:flex-row items-center justify-between">
          <SignedIn>
            <NavigationMenuItem className="mb-2 sm:mb-0 sm:mr-12">
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10"
                  }
                }}
              />
            </NavigationMenuItem>
          </SignedIn>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-12">
            <SignedIn>
              <NavigationMenuItem>
                <Link to="/home" passHref legacyBehavior>
                  <NavigationMenuLink className="hover:text-blue-600 transition-colors duration-200">
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
             
              <NavigationMenuItem>
                <Link to="/history" passHref legacyBehavior>
                  <NavigationMenuLink className="hover:text-blue-600 transition-colors duration-200">
                    History
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </SignedIn>
          </div>
          <SignedOut>
            <NavigationMenuItem className="mt-2 sm:mt-0 sm:ml-auto">
              <Link to="/home" passHref legacyBehavior>
                <Button variant="outline" className="hover:bg-blue-600 hover:text-white transition-colors duration-200">
                  Sign In
                </Button>
              </Link>
            </NavigationMenuItem>
          </SignedOut>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

export default Navbar;