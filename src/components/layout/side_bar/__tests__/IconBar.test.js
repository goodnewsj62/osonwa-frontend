import userEvent from "@testing-library/user-event";
import setUpStore from "store/store";
import { render, screen } from "utils/RtkOveride";
import IconBar from "../IconBar";

describe("icon bar asserts", () => {
    test("icon bar is in document", () => {
        render(
            <IconBar />
        );

        expect(screen.getByLabelText("icon nav")).toBeInTheDocument();
    });

    test("side bar toggle button", () => {
        const store = setUpStore();
        render(
            <IconBar />,
            { store }
        );

        const showSideBar = screen.getByTestId("show__sidebar");
        userEvent.click(showSideBar);

        expect(store.getState().sideBarState).toBeTruthy();
    });

});