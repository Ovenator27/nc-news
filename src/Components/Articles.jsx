import axios from "axios";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import ChangePage from "./ChangePage";

export default function Articles() {
  const [articleList, setArticleList] = useState([]);
  const [page, setPage] = useState(1)

  useEffect(() => {
    axios
      .get(`https://northcoders-news-03ck.onrender.com/api/articles?p=${page}`)
      .then(({ data: { articles } }) => {
        console.log('re-render!');
        setArticleList(articles);
        window.scrollTo(0, 0)
      });
  }, [page]);

  return (
    <div>
      <h1>Articles</h1>
      <ChangePage setPage={setPage} page={page}/>
      <ul>{articleList.map((article) => {
        return <ArticleCard key={article.article_id} article={article}/>
      })}</ul>
      <ChangePage setPage={setPage} page={page}/>
      <p>Page: {page}</p>
    </div>
  );
}
