import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar() {
  const { currentUser, handleLogout } = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <p className="sidebar__username">{currentUser.name}</p>

        <img
          src={currentUser.avatar}
          alt="Profile Picture"
          className="sidebar__avatar"
        />
      </div>

      <div className="sidebar__buttons">
        <button type="button" className="sidebar__edit-profile">
          Edit profile
        </button>

        <button
          type="button"
          className="sidebar__logout"
          onClick={handleLogout}
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
