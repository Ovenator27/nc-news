export default function ArticleCard({ article }) {

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
        <p>{article.votes} votes</p>
        <p>topic: {article.topic}</p>
      </div>
    </li>
  );
}
