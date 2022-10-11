import { screen, render } from "utils/RtkOveride";
import userEvent from "@testing-library/user-event";
import ChangeApperance from "../ToggleMode";
import setUpStore from "store/store";



describe("toggle theme mode", () => {
    test("toggle button animation", () => {
        render(<ChangeApperance />);

        const toggleDiv = screen.getByText("Apperance");
        userEvent.click(toggleDiv);

        expect(screen.getByRole("button").classList.length).toBeGreaterThan(0);
    });

    test("toggle store state change on toggle", () => {
        const store = setUpStore();
        const initialState = store.getState().mode;

        render(<ChangeApperance />, { store: store });

        const toggleDiv = screen.getByText("Apperance");
        userEvent.click(toggleDiv);

        const finalState = store.getState().mode;
        expect(initialState).not.toEqual(finalState);
    });
});