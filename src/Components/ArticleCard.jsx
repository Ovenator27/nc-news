import UserContext from "../Contexts/SignedInUser";
import { patchArticle } from "../api";
import { useContext, useState } from "react";

export default function ArticleCard({ article, setArticleList, canVote }) {
  const { signedInUser } = useContext(UserContext);
  const [vote, setVote] = useState(null);
  const [voteError, setVoteError] = useState(null);

  function handleVote(e) {
    e.preventDefault();
    setVote(e.target.id);
    setArticleList((currList) => {
      const newList = currList.map((item) => {
        if (item.article_id === +e.target.value) {
          item.votes = item.votes + +e.target.id;
        }
        return item;
      });
      return newList;
    });
    const body = {
      inc_votes: e.target.id,
    };
    patchArticle(e.target.value, body).catch((err) => {
      setVote(null);
      setVoteError(`${err.message} - vote failed`);
      setArticleList((currList) => {
        const newList = currList.map((item) => {
          if (item.article_id === +e.target.value) {
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
    setArticleList((currList) => {
      const newList = currList.map((item) => {
        if (item.article_id === +e.target.value) {
          item.votes = item.votes - prevVote;
        }
        return item;
      });
      return newList;
    });
    const body = {
      inc_votes: -prevVote,
    };
    patchArticle(e.target.value, body).catch((err) => {
      setVote(vote);
      setVoteError(`${err.message} - undo vote failed`);
      setArticleList((currList) => {
        const newList = currList.map((item) => {
          if (item.article_id === +e.target.value) {
            item.votes = item.votes + +prevVote;
          }
          return item;
        });
        return newList;
      });
    });
  }

  return (
    <li className="article-card">
      <div className="article-card-header">
        <h2>{article.title}</h2>
        <p>posted by: {article.author}</p>
      </div>
      <img
        className="article-card-img"
        src={article.article_img_url}
        alt="article image"
      />
      <p>{article.body}</p>
      <div className="article-card-footer">
        <p>{article.comment_count} comments</p>
        <div>
          {article.votes} votes{" "}
          {signedInUser.username !== "" && canVote &&
            (vote === null ? (
              <div className="vote-button-wrapper">
                <button className="vote-button" value={article.article_id} id="1" onClick={handleVote}>
                  +
                </button>
                <button className="vote-button" value={article.article_id} id="-1" onClick={handleVote}>
                  -
                </button>{" "}
              </div>
            ) : (
              <div>
                <button className="red-button" value={article.article_id} onClick={handleUndoVote}>
                  undo vote
                </button>
              </div>
            ))}
        </div>
        <p>topic: {article.topic}</p>
      </div>
      <div className="error-text">{voteError}</div>
    </li>
  );
}
