import axios from "axios";
import { useEffect, useState, useContext } from "react";
import ArticleCard from "./ArticleCard";
import ChangePage from "./ChangePage";
import { Link } from "react-router-dom";
import ArticleIdContext from "../Contexts/ArticleId";

export default function Articles() {
  const [articleList, setArticleList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setisLoading] = useState(true)
  const { setArticleId } = useContext(ArticleIdContext);

  useEffect(() => {
    setisLoading(true)
    axios
      .get(`https://northcoders-news-03ck.onrender.com/api/articles?p=${page}`)
      .then(({ data: { articles } }) => {
        setArticleList(articles);
        window.scrollTo(0, 0);
        setisLoading(false)
      });
  }, [page]);

  return ( isLoading ? <h1>Loading Articles</h1> :
    <div>
      <h1>Articles</h1>
      <ChangePage setPage={setPage} page={page} />
      <ul className="article-list">
        {articleList.map((article) => {
          return (
            <Link
              key={article.article_id}
              onClick={() => {
                setArticleId(article.article_id);
              }}
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
