export default function TopicCard ({topic}) {
    return (
        <li className="topic-card">
            <h2 className="topic-card-heading">{topic.slug}</h2>
            <p>{topic.description}</p>
        </li>
    )
}