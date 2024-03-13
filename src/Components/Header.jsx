import { Link } from "react-router-dom";
import UserContext from "../Contexts/SignedInUser";
import { useContext } from "react";

export default function Header() {
  const { signedInUser } = useContext(UserContext);

  return (
    <nav>
      <ul className="menu">
        <div className="menu-links">
        <Link to={'/'} className="menu-item"><li >NC News</li></Link>
        <Link to={'/topics'} className="menu-item"><li>Topics</li></Link>
        <Link to={'/articles'} className="menu-item"><li>Articles</li></Link>
        <Link to={'/users'} className="menu-item"><li>Users</li></Link>
        <li className="menu-item">Post</li>
        </div>
        <li className="header-user"><img src={signedInUser.avatar_url} className="header-user-img"/>{signedInUser.username}</li>
      </ul>
    </nav>
  );
}
