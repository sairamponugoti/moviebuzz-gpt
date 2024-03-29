import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import {
  LOGO,
  SUPPORTED_LANGUAGES,
  USER_AVATAR_DEFAULT,
} from "../utils/constants";
import { toggleGptSearch } from "../utils/gptSlice";
import { selectLang } from "../utils/appConfigSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const selectedLang = useSelector((store) => store.appConfig.selectedLang);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });
    // returns a function, on component unmount unsubscribes the onAuthStateChanged event listener
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleGptSearch = () => {
    dispatch(toggleGptSearch());
  };

  const handleLangChange = (e) => {
    dispatch(selectLang(e.target.value));
  };

  return (
    <div className="absolute px-8  py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between">
      <img className="w-40" src={LOGO} alt="MovieBuzz GPT" />
      {user && (
        <div className="flex p-2">
          {showGptSearch && (
            <select
              value={selectedLang}
              className="p-2 m-2 bg-gray-400"
              onChange={handleLangChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={handleGptSearch}
            className="p-2 m-2 bg-purple-700 text-white rounded-md hover:bg-opacity-80"
          >
            {showGptSearch ? "HomePage" : "GPT Search"}
          </button>
          <img
            className="w-12 h-12 rounded-full"
            src={user.photoURL ? user.photoURL : USER_AVATAR_DEFAULT}
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
