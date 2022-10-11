import { useSelector } from "react-redux";
import IconBar from "./IconBar";
import SideBar from "./SideBar";


function SideNavBar() {
    const sideBarState = useSelector((state) => state.sideBarState);

    return (
        <>
            <IconBar sideBarState={sideBarState} />
            <SideBar sideBarState={sideBarState} />
        </>
    );
};


export default SideNavBar;