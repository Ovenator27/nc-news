import axios from "axios";

export default function ArticleCard({ article, setArticleList }) {

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
    axios.patch(
      `https://northcoders-news-03ck.onrender.com/api/articles/${e.target.value}`,
      body
    );
  }

  return (
    <li className="article-card">
      <div className="article-card-header">
        <p>{article.title}</p>
        <p>posted by: {article.author}</p>
      </div>
      <img className="article-card-img" src={article.article_img_url} />
      <p>{article.body}</p>
      <div className="article-card-footer">
        <p>{article.comment_count} comments</p>
        <p>
          <button value={article.article_id} id="1" onClick={handleLike}>
            +
          </button>
          <button value={article.article_id} id="-1" onClick={handleLike}>
            -
          </button>{" "}
          {article.votes} votes{" "}
        </p>
        <p>topic: {article.topic}</p>
      </div>
    </li>
  );
}
