import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import ChangePage from "./ChangePage";
import { Link, useSearchParams } from "react-router-dom";
import { getAllArticles } from "../api";

export default function Articles() {
  const [articleList, setArticleList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const [sortBy, setSortBy] = useState("created_at");
  const [orderBy, setOrderBy] = useState("desc");
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setisLoading(true);
    getAllArticles(page, sortBy, orderBy).then(
      ({ data: { articles, total_count } }) => {
        setPageCount(Math.ceil(total_count / 10));
        setArticleList(articles);
        window.scrollTo(0, 0);
        setSearchParams({ sort_by: sortBy, order_by: orderBy });
        setisLoading(false);
      }
    );
  }, [page, sortBy, orderBy]);

  function handleOrderBy(e) {
    e.preventDefault();
    if (orderBy === "desc") {
      setOrderBy("asc");
    } else {
      setOrderBy("desc");
    }
  }

  return isLoading ? (
    <h1>Loading Articles</h1>
  ) : (
    <>
      <h1>Articles</h1>
      <ChangePage setPage={setPage} page={page} pageCount={pageCount} />
      <div className="sort-bar">
        <div>
          <label>Sort articles by: </label>
          <select
            className="article-list-sort"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
          >
            <option value="created_at">created date</option>
            <option value="comment_count">comments</option>
            <option value="votes">votes</option>
          </select>
        </div>
        <div>
          <label>Order by:</label>
          <button onClick={handleOrderBy}>{orderBy}ending</button>
        </div>
      </div>
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
      <ChangePage setPage={setPage} page={page} pageCount={pageCount} />
      <p>Page: {page}</p>
    </>
  );
}
