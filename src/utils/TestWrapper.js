import store from 'store';
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";


export default function TestWrapper(props){
    return (
        <Provider store={store}>
            <Router>
                <>
                {props.children}
                </>
            </Router>
        </Provider>
    );
};