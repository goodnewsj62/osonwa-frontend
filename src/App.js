import { Header, SideBar, IconBar } from "./layout";
import "./styles/base.css";


function App(props) {
    return (
        <div className="container">
            <Header />
            <IconBar />
            <SideBar />
        </div>
    )
}

export default App;