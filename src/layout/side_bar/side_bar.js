import {MainNav, NavOthers} from "./sidenavs";

function SideBar(props){
    return (
        <aside aria-label="side bar" className="side__bar">
            <MainNav />
            <div className="demacation"></div>
            <section aria-labelledby="#others">
                <h4>Others</h4>
                <NavOthers />
            </section>
        </aside>
    )
}


function IconBar(){
    return(
        <div className="icon__bar">

        </div>
    )
}

export {IconBar};
export default SideBar;