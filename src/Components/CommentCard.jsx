export default function CommentCard ({comment}) {
    return (
        <li className="comment-card">
            <h3>{comment.author}:</h3>
            <p>{comment.body}</p>
            <p>{comment.votes} votes</p>
        </li>
    )
}