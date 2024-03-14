import { useContext, useState } from "react";
import UserContext from "../Contexts/SignedInUser";
import { deleteComment, patchComment } from "../api";

export default function CommentCard({ comment, setCommentsList }) {
  const { signedInUser } = useContext(UserContext);
  const [commentDeleted, setCommentDeleted] = useState(false);
  const [vote, setVote] = useState(null);
  const [voteError, setVoteError] = useState(null)

  function handleCommentDelete(e) {
    e.preventDefault();
    deleteComment(e.target.value).then(() => {
      setCommentDeleted(true);
    });
  }

  function handleVote(e) {
    e.preventDefault();
    setVote(e.target.id);
    setCommentsList((currList) => {
      const newList = currList.map((item) => {
        if (item.comment_id === +e.target.value) {
          item.votes = item.votes + +e.target.id;
        }
        return item;
      });
      return newList;
    });
    const body = {
      inc_votes: e.target.id,
    };
    patchComment(e.target.value, body).catch((err) => {
      setVote(null);
      setVoteError(`${err.message} - vote failed`);
      setCommentsList((currList) => {
        const newList = currList.map((item) => {
          if (item.comment_id === +e.target.value) {
            item.votes = item.votes - +e.target.id;
          }
          return item;
        });
        return newList;
      });
    });
  }

  function handleUndoVote(e) {
    e.preventDefault();
    const prevVote = vote;
    setVote(null);
    setCommentsList((currList) => {
      const newList = currList.map((item) => {
        if (item.comment_id === +e.target.value) {
          item.votes = item.votes - prevVote;
        }
        return item;
      });
      return newList;
    });
    const body = {
      inc_votes: -prevVote,
    };
    patchComment(e.target.value, body).catch((err) => {
      setVote(vote);
      setVoteError(`${err.message} - undo vote failed`);
      setCommentsList((currList) => {
        const newList = currList.map((item) => {
          if (item.comment_id === +e.target.value) {
            item.votes = item.votes + +prevVote;
          }
          return item;
        });
        return newList;
      });
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
      <div className="comment-votes">
          <p className="comment-vote-count">{comment.votes} votes{" "}</p>
          {signedInUser.username !== "" &&
            (vote === null ? (
              <div className="vote-button-wrapper">
                <button className="vote-button" value={comment.comment_id} id="1" onClick={handleVote}>
                  +
                </button>
                <button className="vote-button" value={comment.comment_id} id="-1" onClick={handleVote}>
                  -
                </button>{" "}
              </div>
            ) : (
              <div>
                <button className="red-button" value={comment.comment_id} onClick={handleUndoVote}>
                  undo vote
                </button>
              </div>
            ))}
        </div>
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
