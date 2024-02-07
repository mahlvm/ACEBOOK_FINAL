import './Comment.css';


const Comments = (props) => {
    return (
        <>
    <br/>
        <div className='boxComment'>

        <p className="messageComment">
            <article key={props.comment._id}>{props.comment.message}</article>
        </p>

        <p className="dateComment">
            <h6><div>{props.date}</div></h6>
        </p>

        </div>
    </>
    );
};

export default Comments;
