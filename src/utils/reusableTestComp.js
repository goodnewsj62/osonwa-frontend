


export function reusableNavLinkTest(linkText, path, screen) {

    const navLink = screen.getByRole("link", { name: linkText });
    const href = navLink.getAttribute("href");

    expect(navLink).toBeInTheDocument();
    expect(href).toEqual(path);
};