import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import CommentCard from "./CommentCard";
import UserContext from "../Contexts/SignedInUser";
import {
  deleteArticle,
  getComments,
  getSingleArticle,
  postComment,
} from "../api";

export default function SingleArticle() {
  const { articleId } = useParams();
  const [articleInfo, setArticleInfo] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { signedInUser } = useContext(UserContext);
  const [commentInput, setCommentInput] = useState("");
  const [commentSubmit, setCommentSubmit] = useState(false);
  const [commentError, setCommentError] = useState(null);
  const [canVote, setCanVote] = useState(true);
  const [articleDeleted, setArticleDeleted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const article = getSingleArticle(articleId);
    const comments = getComments(articleId);
    Promise.all([article, comments])
      .then(
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
      )
      .catch(({ response }) => {
        setError(response);
      });
  }, []);

  function handleCommentSubmit(e) {
    if (commentSubmit === false) {
      setCommentSubmit(true);
      e.preventDefault();
      const body = {
        username: signedInUser.username,
        body: commentInput,
      };
      postComment(articleId, body)
        .then(({ data: { comment } }) => {
          setCommentsList((currList) => {
            return [comment, ...currList];
          });
          setCommentInput("");
          setCommentSubmit(false);
        })
        .catch((err) => {
          setCommentError(`${err.message} - comment not posted`);
        });
    }
  }

  function handleDeleteArticle(e) {
    e.preventDefault();
    deleteArticle(articleId).then(() => {
      setArticleDeleted(true);
    });
  }

  if (error) {
    return (
      <h1>
        {error.status}: {error.data.msg}
      </h1>
    );
  }
  if (articleDeleted) {
    return (
      <>
        <h1>Article Deleted</h1>
        <Link to={"/articles"}>
          <button style={{ color: "black" }}>Return to articles</button>
        </Link>
      </>
    );
  }
  return isLoading ? (
    <h1>Loading Article</h1>
  ) : (
    <>
      <div className="single-article-wrapper">
        <ArticleCard
          className="single-article"
          article={articleInfo[0]}
          setArticleList={setArticleInfo}
          canVote={canVote}
        />
      </div>
      <button className="red-button" onClick={handleDeleteArticle}>
        Delete article
      </button>
      <div className="comment-list">
        {signedInUser.username === "" ? (
          <p style={{ alignSelf: "center" }}>
            <Link to={"/users"}>Sign in</Link> to comment
          </p>
        ) : (
          <form onSubmit={handleCommentSubmit}>
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
            <div className="error-text">{commentError}</div>
            <button>Comment</button>
          </form>
        )}
        <ul>
          {commentsList.map((comment) => {
            return <CommentCard comment={comment} key={comment.comment_id} setCommentsList={setCommentsList}/>;
          })}
        </ul>
      </div>
    </>
  );
}
