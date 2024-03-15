export default function TopicCard ({topic}) {
    return (
        <>
            <h2 className="topic-card-heading">{topic.slug}</h2>
            <p>{topic.description}</p>
        </>
    )
}