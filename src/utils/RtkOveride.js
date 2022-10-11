import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import setUpStore from "store/store";



function renderWithWrapers(ui,
    {
        preloadedState = {},
        store = setUpStore(preloadedState),
        ...options
    } = {},
) {
    function Wrapper({ children }) {
        return (
            <Provider store={store}>
                <Router>
                    {children}
                </Router>
            </Provider>
        );
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...options }) };
}



export * from "@testing-library/react";
export { renderWithWrapers as render };