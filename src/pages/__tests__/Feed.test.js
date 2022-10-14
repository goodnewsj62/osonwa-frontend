import { render, screen } from "utils/RtkOveride";
import Feed from "pages/Feed";
import setUpStore from "store/store";
import sideBarActions from "store/SideBarSlice";
import { act } from "react-dom/test-utils";

describe("feed page test cases", () => {
    test("push content to left on large screen when side bar comes on", () => {
        const store = setUpStore();
        render(
            <Feed />,
            { store }
        );

        const mainDiv = screen.getByRole("main");
        const classesBefore = mainDiv.classList.toString();

        act(() => {
            store.dispatch(sideBarActions.show());
        });

        const classesAfter = mainDiv.classList.toString();
        expect(classesBefore).not.toEqual(classesAfter);
    });
});