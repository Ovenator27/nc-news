import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import ChangePage from "./ChangePage";
import { Link } from "react-router-dom";
import { getAllArticles } from "../api";

export default function Articles() {
  const [articleList, setArticleList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setisLoading(true);
    getAllArticles(page).then(({ data: { articles } }) => {
      setArticleList(articles);
      window.scrollTo(0, 0);
      setisLoading(false);
    });
  }, [page]);

  return isLoading ? (
    <h1>Loading Articles</h1>
  ) : (
    <div>
      <h1>Articles</h1>
      <ChangePage setPage={setPage} page={page} />
      <ul className="article-list">
        {articleList.map((article) => {
          return (
            <Link
              key={article.article_id}
              to={`/articles/${article.article_id}`}
            >
              <ArticleCard article={article} setArticleList={setArticleList} />
            </Link>
          );
        })}
      </ul>
      <ChangePage setPage={setPage} page={page} />
      <p>Page: {page}</p>
    </div>
  );
}
