import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import CommentCard from "./CommentCard";

export default function SingleArticle() {
  const { articleId } = useParams();
  const [articleInfo, setArticleInfo] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const article = axios.get(
      `https://northcoders-news-03ck.onrender.com/api/articles/${articleId}`
    );
    const comments = axios.get(
      `https://northcoders-news-03ck.onrender.com/api/articles/${articleId}/comments`
    );
    Promise.all([article, comments]).then(
      ([
        {
          data: { article },
        },
        {
          data: { comments },
        },
      ]) => {
        setArticleInfo([article]);
        setCommentsList(comments);
        setIsLoading(false)
      }
    );
  }, []);

  return ( isLoading ? <h1>Loading Article</h1> : 
    <>
      <ArticleCard article={articleInfo[0]} setArticleList={setArticleInfo} />
      <h2>Comments</h2>
      <ul className="comments-list">
        {commentsList.map((comment) => {
          return <CommentCard comment={comment} key={comment.comment_id} />;
        })}
      </ul>
    </>
  );
}
