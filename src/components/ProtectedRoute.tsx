import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import React from 'react';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}


export const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
    return (
      <>
        <SignedIn>{element}</SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </>
    );
  };