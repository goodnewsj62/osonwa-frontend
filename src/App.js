import { Header, SideBar, IconBar } from "./layout";
import { NormalCard, PopUpCard, MessagePopup, CookiePopup, AuthCard } from "./others";
import "./styles/base.css";


function App(props) {
    return (
        <div className="container">
            <Header />
            <IconBar />
            <SideBar />
            {/* <MessagePopup />
            <AuthCard />
            <CookiePopup /> */}
            <main style={{paddingLeft:"400px",paddingTop:"70px", width:"100vw",minHeight:"100vh"}}>
                <NormalCard />
            </main>
        </div>
    )
}

export default App;