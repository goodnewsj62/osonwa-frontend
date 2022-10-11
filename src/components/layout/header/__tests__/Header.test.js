import { render, screen } from "utils/RtkOveride";
import Header from "../Header";




describe("Header Components", () => {
    test("logo with link", () => {
        render(
            <Header />
        );

        const link = screen.getByRole("link", { name: "Osonwa.", exact: false })
        expect(link).toBeInTheDocument();
    });

    test("search bar in dom", () => {
        render(
            <Header />
        );

        const inputBar = screen.getByPlaceholderText("search");
        expect(inputBar).toBeInTheDocument();
    });
    test("render login button for unauthenticated users", () => {
        render(
            <Header />
        );


        const inputBar = screen.getByText("Login", { exact: false });
        expect(inputBar).toBeInTheDocument();
    });

    test("login button not rendered  if authenticated", () => {

        render(
            <Header />
            , { preloadedState: { authState: { state: true, refresh: "", access: "" } } }
        );


        const inputBar = screen.queryByText("Login", { exact: false });
        expect(inputBar).toBeNull();
    });


    test("profile image/representation when authenticated", () => {
        render(
            <Header />
            , { preloadedState: { authState: { state: true, refresh: "", access: "" } } }
        );

        const profileDiv = screen.getByTestId("profileImage");
        expect(profileDiv).toBeInTheDocument();
    });
});

