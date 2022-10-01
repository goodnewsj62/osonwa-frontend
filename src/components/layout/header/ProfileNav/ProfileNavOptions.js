



const ProfileNavOptions = ({ showNav }) => {
    return (
        <ul onClick={showNav}>
            <li>Profile</li>
            <li>Edit Profile</li>
            <li>Posts</li>
            <li>Social accounts</li>
        </ul>
    );
};



export default ProfileNavOptions;