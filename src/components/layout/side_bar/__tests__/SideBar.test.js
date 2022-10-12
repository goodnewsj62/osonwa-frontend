import userEvent from "@testing-library/user-event";
import setUpStore from "store/store";
import { reusableNavLinkTest } from "utils/reusableTestComp";
import { render, screen } from "utils/RtkOveride";
import SideBar from "../SideBar";

describe("test side nav links and action", () => {
    test("side bar is rendered", () => {
        render(
            <SideBar />
        );

        const sideBar = screen.getByRole("complementary"); //aside
        expect(sideBar).toBeInTheDocument();
    });

    test("click action to hide sidebar", () => {
        const store = setUpStore({ sideBarState: true });

        render(
            <SideBar sideBarState={store.getState().sideBarState} />,
            { store: store }
        );

        const sideBar = screen.getByRole("complementary");
        const collapseButton = screen.getByRole("button");

        const sideBarClassesBefore = sideBar.classList.toString();

        userEvent.click(collapseButton);
        expect(store.getState().sideBarState).toBeFalsy();


        // test class list change 

        const { container: con } = render(
            <SideBar sideBarState={store.getState().sideBarState} />,
            { store: store }
        );

        const sideBarClassesAfter = con.querySelector("aside").classList.toString();

        expect(sideBarClassesBefore).not.toEqual(sideBarClassesAfter);
    });

    test("link to home exists", () => {
        render(
            <SideBar />
        );
        reusableNavLinkTest("News", "/", screen);
    });

    test("link to articles exists", () => {
        render(
            <SideBar />
        );
        reusableNavLinkTest("Articles", "/articles", screen);
    });
    test("link to trending exists", () => {
        render(
            <SideBar />
        );
        reusableNavLinkTest("Trending", "/trending", screen);
    });
    test("link to fresh exists", () => {
        render(
            <SideBar />
        );
        reusableNavLinkTest("Fresh", "/fresh", screen);
    });
    test("link to about exists", () => {
        render(
            <SideBar />
        );
        reusableNavLinkTest("About", "/about", screen);
    });
    test("link to support exists", () => {
        render(
            <SideBar />
        );
        reusableNavLinkTest("Support", "/support", screen);
    });
    test("link to contact exists", () => {
        render(
            <SideBar />
        );
        reusableNavLinkTest("Contact", "/contact", screen);
    });
    test("link to privacy policy exists", () => {
        render(
            <SideBar />
        );
        reusableNavLinkTest("Privacy Policy", "/privacy-policy", screen);
    });
});