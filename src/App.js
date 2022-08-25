import { Home, Layout } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import "./styles/base.css";
import { useState } from "react";


function App(props) {
    const [auth, setAuth] = useState(false);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App;