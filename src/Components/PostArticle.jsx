import { useContext, useEffect, useState } from "react";
import UserContext from "../Contexts/SignedInUser";
import { getTopics, postArticle } from "../api";

export default function PostArticle({ topicList, setTopicList }) {
  const { signedInUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [postTitleInput, setPostTitleInput] = useState("");
  const [postTopicInput, setPostTopicInput] = useState("");
  const [postBodyInput, setPostBodyInput] = useState("");
  const [postImgUrlInput, setPostImgUrlInput] = useState("");
  const [postSubmitting, setPostSubmitting] = useState(false);
  const [postSubmittedSuccessfully, setPostSubmittedSuccessfully] =
    useState(false);
  const [postError, setPostError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getTopics().then(({ data: { topics } }) => {
      setTopicList(topics);
      setIsLoading(false);
    });
  }, []);

  function handlePostSubmit(e) {
    if (postSubmitting === false) {
      setPostSubmitting(true);
      e.preventDefault();
      const body = {
        author: signedInUser.username,
        title: postTitleInput,
        body: postBodyInput,
        topic: postTopicInput,
        article_img_url: postImgUrlInput,
      };
      postArticle(body)
        .then(({ data: { article } }) => {
          setPostTitleInput("");
          setPostTopicInput("");
          setPostBodyInput("");
          setPostImgUrlInput("");
          setPostSubmitting(false);
          setPostSubmittedSuccessfully(true);
        })
        .catch((err) => {
          setPostError(`${err.message} - article not posted`);
        });
    }
  }

  return isLoading ? (
    <h1>Loading</h1>
  ) : (
    postSubmittedSuccessfully ? <h1>Post submit successful</h1> :
    <>
      <h1>Post a new article</h1>
      <div className="post-article-wrapper">
        <form className="post-article-form" onSubmit={handlePostSubmit}>
          <label className="post-label" htmlFor="post-title">
            Article title:
          </label>
          <input
            required
            type="text"
            className="post-input"
            id="post-title"
            value={postTitleInput}
            onChange={(e) => {
              setPostTitleInput(e.target.value);
            }}
          ></input>
          <label className="post-label" htmlFor="post-topic">
            Article topic:
          </label>
          <select
            required
            className="post-input"
            id="post-topic"
            value={postTopicInput}
            onChange={(e) => {
              setPostTopicInput(e.target.value);
            }}
          >
            <option value="">- Choose a topic -</option>
            {topicList.map((topic) => {
              return <option key={topic.slug} value={topic.slug}>{topic.slug}</option>;
            })}
          </select>
          <label className="post-label" htmlFor="post-body">
            Article body:
          </label>
          <textarea
            required
            className="post-input"
            id="post-body"
            value={postBodyInput}
            onChange={(e) => {
              setPostBodyInput(e.target.value);
            }}
          ></textarea>
          <label className="post-label" htmlFor="post-img-url">
            Article image url (optional):
          </label>
          <input
            type="url"
            className="post-input"
            id="post-img-url"
            value={postImgUrlInput}
            onChange={(e) => {
              setPostImgUrlInput(e.target.value);
            }}
          ></input>
          <button id="post-submit-button">Post</button>
        </form>
      </div>
    </>
  );
}
