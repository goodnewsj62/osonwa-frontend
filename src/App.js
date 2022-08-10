import { Header, SideBar, IconBar } from "./layout";
import { NormalCard, PopUpCard, MessagePopup, CookiePopup, AuthCard } from "./others";
import "./styles/base.css";


function App(props) {
    return (
        <div className="container">
            <Header />
            <IconBar />
            <SideBar />
            <MessagePopup />
            <AuthCard />
            <CookiePopup />
        </div>
    )
}

export default App;