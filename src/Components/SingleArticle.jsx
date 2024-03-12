import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import CommentCard from "./CommentCard";
import UserContext from "../Contexts/SignedInUser";
import { getComments, getSingleArticle, postComment } from "../api";

export default function SingleArticle() {
  const { articleId } = useParams();
  const [articleInfo, setArticleInfo] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { signedInUser } = useContext(UserContext);
  const [commentInput, setCommentInput] = useState("");
  
  useEffect(() => {
    setIsLoading(true);
    const article = getSingleArticle(articleId)
    const comments = getComments(articleId)
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
        setIsLoading(false);
      }
    );
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const body = {
      username: signedInUser.username,
      body: commentInput,
    };
    postComment(articleId, body)
      .then(({data: {comment}}) => {
        setCommentsList((currList) => {
          return [comment, ...currList]
        })
        setCommentInput("");
      });
  }

  return isLoading ? (
    <h1>Loading Article</h1>
  ) : (
    <>
      <ArticleCard article={articleInfo[0]} setArticleList={setArticleInfo} />
      <div className="comments-list">
        <form onSubmit={handleSubmit}>
          <label htmlFor="comment-body">
            Comment as {signedInUser.username}
          </label>
          <br />
          <textarea
            className="comment-input"
            id="comment-body"
            value={commentInput}
            placeholder={`Add a comment for ${articleInfo[0].author}`}
            onChange={(e) => {
              setCommentInput(e.target.value);
            }}
            required
          ></textarea>
          <button>Comment</button>
        </form>
        <ul>
          {commentsList.map((comment) => {
            return <CommentCard comment={comment} key={comment.comment_id} />;
          })}
        </ul>
      </div>
    </>
  );
}
