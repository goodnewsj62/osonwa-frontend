import { Header, SideBar, IconBar } from "./layout";
import { NormalCard, PopUpCard, MessagePopup, CookiePopup, AuthCard } from "./others";
import "./styles/base.css";


function App(props) {
    const main =  {paddingLeft:"400px"}
    return (
        <div className="container">
            <Header />
            <IconBar />
            <SideBar />
            {/* <MessagePopup />
            <AuthCard />
            <CookiePopup /> */}
            <main style={{paddingTop:"70px", width:"100vw",minHeight:"100vh"}}>
                <NormalCard />
            </main>
        </div>
    )
}

export default App;