export function googleInit(theme, type_, handler, buttonRef) {
    window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_G_CLIENT_ID,
        callback: handler
    });

    window.google.accounts.id.renderButton(
        buttonRef.current, { theme: theme, size: "large", type: type_ })
};