import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import ChangePage from "./ChangePage";
import { Link } from "react-router-dom";
import { getAllArticles } from "../api";

export default function Articles() {
  const [articleList, setArticleList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0)
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setisLoading(true);
    getAllArticles(page).then(({ data: { articles, total_count } }) => {
      setPageCount(Math.ceil(total_count/10));
      setArticleList(articles);
      window.scrollTo(0, 0);
      setisLoading(false);
    });
  }, [page]);

  return isLoading ? (
    <h1>Loading Articles</h1>
  ) : (
    <>
      <h1>Articles</h1>
      <ChangePage setPage={setPage} page={page} pageCount={pageCount} />
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
      <ChangePage setPage={setPage} page={page} pageCount={pageCount}/>
      <p>Page: {page}</p>
    </>
  );
}
