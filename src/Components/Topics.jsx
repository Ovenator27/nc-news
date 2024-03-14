import { useEffect, useState } from "react";
import { getTopics } from "../api";
import TopicCard from "./TopicCard";
import { Link } from "react-router-dom";

export default function Topics({topicList, setTopicList}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=> {
    setIsLoading(true)
    getTopics().then(({data: {topics}})=> {
        setTopicList(topics)
        setIsLoading(false)
    })
  }, [])

  return isLoading ? (
    <h1>Loading Topics</h1>
  ) : (
    <>
      <h1>Topics</h1>
      <ul className="topic-list">
        {topicList.map((topic) => {
          return (
            <Link key={topic.slug} to={`/topics/${topic.slug}`}>
              {" "}
              <TopicCard topic={topic} />
            </Link>
          );
        })}
      </ul>
    </>
  );
}
