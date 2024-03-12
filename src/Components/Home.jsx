import { useEffect, useState } from "react";
import { getAllArticles } from "../api";
import ArticleCard from "./ArticleCard";
import { Link } from "react-router-dom";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [popularArticleList, setPopularArticleList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getAllArticles(1, "votes", "desc").then(({ data: { articles } }) => {
      setPopularArticleList(articles);
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <h1>Loading Articles</h1>
  ) : (
    <>
      <h1>Welcome to NC News!</h1>
      <h2>Check out the hottest articles right now!</h2>
      <ul>
        {popularArticleList.map((article)=> {
           return <Link
            key={article.article_id}
            to={`/articles/${article.article_id}`}
          >
            <ArticleCard article={article} setArticleList={setPopularArticleList} />
          </Link>
        })}
      </ul>
    </>
  );
}
