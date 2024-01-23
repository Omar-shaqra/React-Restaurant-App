import { RedirectToSignIn, useAuth } from "@clerk/clerk-react";

const AdminPage = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded || !isSignedIn) {
    return RedirectToSignIn();
  }

  return <div>Logged in</div>;
};
export default AdminPage;
