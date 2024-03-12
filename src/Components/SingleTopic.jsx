import { useEffect, useState } from "react";
import { getArticlesByTopic } from "../api";
import { Link, useParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";

export default function SingleTopic() {
  const [isLoading, setIsLoading] = useState(true);
  const [articlesByTopicList, setArticlesByTopicList] = useState([]);
  const [error, setError] = useState(null)
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticlesByTopic(slug).then(({ data: { articles } }) => {
      setArticlesByTopicList(articles);
      setIsLoading(false);
    }).catch(({response})=> {
        setError(response);
    });
  }, []);

  if (error) {
    return <h1>{error.status}: {error.data.msg}</h1>
  }
  return isLoading ? ( <h1>Loading Articles</h1>) : (
    <>
    <h1>Articles about {slug}</h1>
    <ul className="article-list">
        {articlesByTopicList.map((article) => {
            return <Link
            key={article.article_id}
            to={`/articles/${article.article_id}`}
          >
            <ArticleCard article={article} setArticleList={setArticlesByTopicList} />
          </Link>
        })}
    </ul>
    </>
  )
}
