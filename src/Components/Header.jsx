import { Link } from "react-router-dom";
import UserContext from "../Contexts/SignedInUser";
import { useContext } from "react";

export default function Header() {
  const { signedInUser } = useContext(UserContext);

  return (
    <nav>
      <ul className="menu">
        <Link to={'/'}><li>NC News</li></Link>
        <Link to='/topics'><li>Topics</li></Link>
        <Link to='/articles'><li>Articles</li></Link>
        <li>Users</li>
        <button className='add-article'>+</button>
        <li>{signedInUser.username}</li>
      </ul>
    </nav>
  );
}
