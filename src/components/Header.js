import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="absolute px-8  py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between">
      <img
        className="w-40"
        src="https://moviebuzz.top/wp-content/uploads/2023/09/MovieBuzz-170-×-100px-113-x-50-px.png"
        alt="MovieBuzz GPT"
      />
      {user && (
        <div className="flex p-2">
          <img
            className="w-12 h-12 rounded-full"
            src={
              user.photoURL
                ? user.photoURL
                : "https://occ-0-114-853.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABY20DrC9-11ewwAs6nfEgb1vrORxRPP9IGmlW1WtKuaLIz8VxCx5NryzDK3_ez064IsBGdXjVUT59G5IRuFdqZlCJCneepU.png?r=229"
            }
            alt="user-icon"
          />
          <button className="p-2 font-bold text-white" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
