import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// Logos
import Logo from "components/Logo";
import SocialLogos from "components/SocialLogos";

//Menu
import ActionMenuHover from "components/ActionMenuHover";
import ConfirmModal from "components/ConfirmModal";
import Spinner from "components/Spinner";

//Other
import { toast } from "react-hot-toast";
import { useAuth } from "../../provider/AuthProvider";

function Navbar() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const nav = useNavigate();
  const { user, logout, loading } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Successfully logged out");
      nav("/login");
      console.log("logged out");
    } catch (error) {
      console.error(error);
    }
  };

  const loggedInActions = [
    { label: "My Account", onClick: () => nav("/account") },
    { label: "Settings", onClick: () => nav("/account/settings") },
    { label: "Sign Out", onClick: () => setIsDeleteOpen(true) },
  ];

  const loggedOutActions = [{ label: "Sign In", onClick: () => nav("/login") }];

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex justify-between items-center mx-auto px-20 py-4 w-full max-w-[1700px]">
        <SocialLogos />
        <Link to="/">
          <Logo />
        </Link>
        <div>
          <ActionMenuHover
            buttonContent="My Account"
            actions={user ? loggedInActions : loggedOutActions}
            titleClassName="text-lg font-semibold"
            onClick={() => {
              user ? nav("/account") : nav("/login");
            }}
          />
          <div className="flex justify-center items-center gap-3">
            {user && <img src={user?.avatarURL} height={22} width={22} />}
            <p className="text-center">{user ? user.username : "Log In"}</p>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        onConfirm={handleLogout}
        title="Log Out"
        message="Are you sure you want to log out?"
        confirmText="Log out"
        confirmClassName="bg-red-500 hover:bg-red-600 text-white"
      />
    </>
  );
}

export default Navbar;
