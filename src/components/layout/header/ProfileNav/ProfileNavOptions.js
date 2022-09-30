



const ProfileNavOptions = (props) => {

    const toggleShow = (e) => { };
    return (
        <ul onClick={(e) => { toggleShow(e) }}>
            <li>Profile</li>
            <li>Edit Profile</li>
            <li>Posts</li>
            <li>Social accounts</li>
        </ul>
    );
};



export default ProfileNavOptions;