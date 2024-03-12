import { useContext, useState } from "react";
import UserContext from "../Contexts/SignedInUser";
import { deleteComment } from "../api";

export default function CommentCard ({comment}) {
    const { signedInUser } = useContext(UserContext);
    const [deleted, setDeleted] = useState(false)

    let deleteButton = null

    function handleDelete (e) {
        e.preventDefault()
        setDeleted(true)
        deleteComment(e.target.value)
    }

    if (signedInUser.username === comment.author) {
        deleteButton = <button value={comment.comment_id} className="delete-button" onClick={handleDelete} >delete comment</button>
    }

    return ( deleted ? 
        <li className="comment-card">
    <h3>{comment.author}:</h3>
    <p>Comment Deleted</p>
    </li> : 
        <li className="comment-card">
            <h3>{comment.author}:</h3>
            <p>{comment.body}</p>
            <p>{comment.votes} votes</p>
            {deleteButton}
        </li>
    )
}