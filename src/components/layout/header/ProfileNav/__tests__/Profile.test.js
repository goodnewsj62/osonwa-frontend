import { screen, render } from "utils/RtkOveride";
import userEvent from "@testing-library/user-event";
import Profile from "../Profile";


describe("Profile Div", () => {
    test("click action on profile image or h2 text", ()=>{
        render(<Profile />);

        let profileRepElement = screen.queryByAltText("profile img", {exact:false});
        
        if(!profileRepElement){
            profileRepElement =  screen.getByRole("heading", {level:2})
        }
        
        userEvent.click(profileRepElement);

        const profileDropdown  = screen.getByRole("navigation", {name:"profile navigation"})
        expect(profileDropdown).toBeInTheDocument();
    });
});