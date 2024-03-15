import { Link } from "react-router-dom";
import UserContext from "../Contexts/SignedInUser";
import { useContext } from "react";

export default function Header() {
  const { signedInUser } = useContext(UserContext);

  return (
    <nav>
      <ul className="menu">
        <li className="menu-links">
        <Link to={'/'} className="menu-item"><p >NC News</p></Link>
        <Link to={'/topics'} className="menu-item"><p>Topics</p></Link>
        <Link to={'/articles'} className="menu-item"><p>Articles</p></Link>
        <Link to={'/users'} className="menu-item"><p>Users</p></Link>
        <Link to={'/post-article'} className="menu-item"><p >Post</p></Link>
        </li>
        <li className="header-user"><img src={signedInUser.avatar_url} alt="user avatar" className="header-user-img"/></li>
      </ul>
    </nav>
  );
}
