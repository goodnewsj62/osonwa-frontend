import { Outlet } from "react-router-dom"
import { Header, IconBar, SideBar } from "components/layout";
import { CookiePopup } from "components/others";


// const storedMode = () => {
//     return localStorage.getItem("mode") === "dark" ? "dark" : "light";
// }


function DefaultLayout(props) {
    // const [cookieState, setCookieState] = useState(storedMode);
    // const [mode, setMode] = useState(storedMode);

    // // TODO: multiple state :-> memo
    // useEffect(() => {
    //     const cStatus = localStorage.getItem("cookieStatus");
    //     setCookieState(cStatus === "true" ? true : false);
    // }, []);



    return (
        <div className="container">
            <Header />
            <IconBar />
            <SideBar />
            <CookiePopup />

            <Outlet />
        </div>
    )
}



export { DefaultLayout };