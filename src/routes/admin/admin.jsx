import { RedirectToSignIn, useAuth, UserButton } from "@clerk/clerk-react";

const AdminPage = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded || !isSignedIn) {
    return RedirectToSignIn();
  }

  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden">
      <div className="flex flex-col flex-1">
        <div className="flex mx-auto w-full items-center justify-center p-4 border-b border-b-orange-700">
          <ul className="flex gap-8 font-semibold">
            <a href="/admin/categories">Categories</a>
            <a href="/admin/subcategories">SubCategories</a>
          </ul>
          <div className="ml-auto">
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminPage;
