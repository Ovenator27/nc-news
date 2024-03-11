import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav>
      <ul className="menu">
        <li>NC News</li>
        <li>Topics</li>
        <Link to='/articles'><li>Articles</li></Link>
        <li>Users</li>
        <button className='add-article'>+</button>
      </ul>
    </nav>
  );
}
