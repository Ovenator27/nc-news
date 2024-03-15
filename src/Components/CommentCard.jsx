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
    setVote(e.target.value);
    setCommentsList((currList) => {
      const newList = currList.map((item) => {
        if (item.comment_id === +e.target.id) {
          item.votes = item.votes + +e.target.value;
        }
        return item;
      });
      return newList;
    });
    const body = {
      inc_votes: e.target.value,
    };
    patchComment(e.target.id, body).catch((err) => {
      setVote(null);
      setVoteError(`${err.message} - vote failed`);
      setCommentsList((currList) => {
        const newList = currList.map((item) => {
          if (item.comment_id === +e.target.id) {
            item.votes = item.votes - +e.target.value;
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
        if (item.comment_id === +e.target.id) {
          item.votes = item.votes - prevVote;
        }
        return item;
      });
      return newList;
    });
    const body = {
      inc_votes: -prevVote,
    };
    patchComment(e.target.id, body).catch((err) => {
      setVote(vote);
      setVoteError(`${err.message} - undo vote failed`);
      setCommentsList((currList) => {
        const newList = currList.map((item) => {
          if (item.comment_id === +e.target.id) {
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
      {signedInUser.username === comment.author && (
        <button
          value={comment.comment_id}
          className="red-button"
          onClick={handleCommentDelete}
        >
          delete comment
        </button>
      )}
      <div className="comment-votes">
          <p className="comment-vote-count">{comment.votes} votes{" "}</p>
          {signedInUser.username !== "" &&
            (vote === null ? (
              <div className="vote-button-wrapper">
                <button className="vote-button" value="1" id={comment.comment_id} onClick={handleVote}>
                  +
                </button>
                <button className="vote-button" value="-1" id={comment.comment_id} onClick={handleVote}>
                  -
                </button>{" "}
              </div>
            ) : (
              <div>
                <button className="red-button" id={comment.comment_id} onClick={handleUndoVote}>
                  undo vote
                </button>
              </div>
            ))}
        </div>
    </li>
  );
}
