import './Comment.css';


const Comments = (props) => {
    return (
        <>
    <br/>
        <div className='boxComment'>

            <div className='commentSpace'>


                <p className="messageComment">
                    <span key={props.comment._id}>{props.comment.message}</span>
                </p>

                <p className="dateComment">
                    <span>{props.date}</span>
                </p>
                
            </div>

        </div>
    </>
    );
};

export default Comments;
