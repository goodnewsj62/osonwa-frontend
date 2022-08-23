import {Home, Layout } from "./pages";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import "./styles/base.css";


function App(props) {
    const main =  {paddingLeft:"400px"}
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element= {<Home />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App;