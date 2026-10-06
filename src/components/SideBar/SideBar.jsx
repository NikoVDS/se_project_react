import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({ handleEditProfileClick }) {
  const { currentUser, handleLogout, handleLoginClick } =
    useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <p className="sidebar__username">{currentUser?.name || "username"}</p>

        {currentUser?.avatar && (
          <img
            src={currentUser.avatar}
            alt="Profile Picture"
            className="sidebar__avatar"
          />
        )}
      </div>

      <div className="sidebar__buttons">
        {currentUser && (
          <button
            type="button"
            className="sidebar__edit-profile"
            onClick={handleEditProfileClick}
          >
            Edit profile
          </button>
        )}

        {currentUser ? (
          <button
            type="button"
            className="sidebar__logout"
            onClick={handleLogout}
          >
            Sign out
          </button>
        ) : (
          <button
            type="button"
            className="sidebar__logout"
            onClick={handleLoginClick}
          >
            Log in
          </button>
        )}
      </div>
    </aside>
  );
}
