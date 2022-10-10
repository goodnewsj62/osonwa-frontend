import { render, screen } from "@testing-library/react";
import Header from "../Header";
import TestWrapper from "utils/TestWrapper";
import { useSelector } from "react-redux";




describe("Header Components", () => {
    test("logo with link", () => {
        render(
            <TestWrapper >
                <Header />
            </TestWrapper>
        );

        const link = screen.getByRole("link", { name: "Osonwa.", exact: false })
        expect(link).toBeInTheDocument();
    });

    test("search bar in dom", () => {
        render(
            <TestWrapper >
                <Header />
            </TestWrapper>
        );

        const inputBar = screen.getByPlaceholderText("search");
        expect(inputBar).toBeInTheDocument();
    });
    test("render login button for unauthenticated users", () => {
        render(
            <TestWrapper >
                <Header />
            </TestWrapper>
        );


        const inputBar = screen.getByText("Login", { exact: false });
        expect(inputBar).toBeInTheDocument();
    });
    test("login button not rendered  if authenticated", () => {

        render(
            <TestWrapper >
                <Header />
            </TestWrapper>
        );


        const inputBar = screen.queryByText("Login", { exact: false });
        expect(inputBar).toBeInTheDocument();
    });
});

