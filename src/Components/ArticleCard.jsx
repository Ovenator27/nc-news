import { patchArticle } from "../api";
import { useState } from "react";

export default function ArticleCard({ article, setArticleList }) {
  const [voteError, setVoteError] = useState(null);

  function handleLike(e) {
    e.preventDefault();
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
      setVoteError(`${err.message} - vote failed`)
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

  return (
    <li className="article-card">
      <div className="article-card-header">
        <h2>{article.title}</h2>
        <p>posted by: {article.author}</p>
      </div>
      <img className="article-card-img" src={article.article_img_url} alt="article image"/>
      <p>{article.body}</p>
      <div className="article-card-footer">
        <p>{article.comment_count} comments</p>
        <div>
        {article.votes} votes{" "}
        <div>
          <button value={article.article_id} id="1" onClick={handleLike}>
            +
          </button>
          <button value={article.article_id} id="-1" onClick={handleLike}>
            -
          </button>{" "}
          </div>
        </div>
        <p>topic: {article.topic}</p>
      </div>
      <div className="error-text">{voteError}</div>
    </li>
  );
}
