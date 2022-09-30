import PNav from "./PNav";


function ProfileNav({ show, setShow, ...others }) {

    // const showHandler = (e) => {
    //     const timeout = setTimeout(() => { setShow(!show) }, 300);
    //     return timeout;
    // }

    return (
        <>
            {show && <PNav />}
        </>
    );

}



export default ProfileNav;