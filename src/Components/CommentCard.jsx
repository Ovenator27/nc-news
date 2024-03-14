import { useContext, useState } from "react";
import UserContext from "../Contexts/SignedInUser";
import { deleteComment } from "../api";

export default function CommentCard({ comment }) {
  const { signedInUser } = useContext(UserContext);
  const [commentDeleted, setCommentDeleted] = useState(false);

  function handleCommentDelete(e) {
    e.preventDefault();
    deleteComment(e.target.value).then(() => {
      setCommentDeleted(true);
    });
  }

  return commentDeleted ? (
    <li className="comment-card">
      <h3>{comment.author}:</h3>
      <p>Comment Deleted</p>
    </li>
  ) : (
    <li className="comment-card">
      <h3>{comment.author}:</h3>
      <p>{comment.body}</p>
      <p>{comment.votes} votes</p>
      {signedInUser.username === comment.author && (
        <button
          value={comment.comment_id}
          className="red-button"
          onClick={handleCommentDelete}
        >
          delete comment
        </button>
      )}
    </li>
  );
}
