import { RedirectToSignIn, useAuth } from "@clerk/clerk-react";

export default function ExternalDataPage() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded || !isSignedIn) {
    return RedirectToSignIn();
  }

  return <div>Logged in</div>;
}
