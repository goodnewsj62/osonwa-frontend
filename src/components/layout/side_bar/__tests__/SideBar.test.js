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
});