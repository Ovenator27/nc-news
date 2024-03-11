import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";

export default function SingleArticle() {
  const [articleInfo, setArticleInfo] = useState({});
  const { articleId } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://northcoders-news-03ck.onrender.com/api/articles/${articleId}`
      )
      .then(({ data: { article } }) => {
        setArticleInfo(article);
      });
  }, []);

  return (
    <ArticleCard article={articleInfo}/>
  );
}
