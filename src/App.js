import { Header, SideBar, IconBar } from "./layout";
import { NormalCard, MessagePopup, CookiePopup, AuthCard, Carousel } from "./others";
import "./styles/base.css";


function App(props) {
    const main =  {paddingLeft:"400px"}
    return (
        <div className="container">
            <Header />
            {/* <IconBar />
            <SideBar />
            <MessagePopup />
            <AuthCard />
            <CookiePopup />
            <main style={{paddingTop:"70px",minHeight:"100vh"}}>
                <NormalCard />
                <NormalCard />
                <NormalCard />
                <NormalCard />
            </main> */}
            <Carousel />
        </div>
    )
}

export default App;