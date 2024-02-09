const ProfileFeedSelector = (props) => {

    const handlePostFeedClick = () => {
        props.setFeed("Posts")
    }

    const handleLikedFeedClick = () => {
        props.setFeed("Liked")
    }

    return (
        <>
            <h4><a onClick={handlePostFeedClick}>Posts</a></h4>
            <h4><a onClick={handleLikedFeedClick}>Liked</a></h4>
        </>
    )
}

export default ProfileFeedSelector