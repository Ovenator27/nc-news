export default function UserCard({ user }) {
  return (
    <li className="user-card">
      <div className="user-img-box">
        <img className="user-img" src={user.avatar_url} />
      </div>
      <h2>{user.username}</h2>
    </li>
  );
}
