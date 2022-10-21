import FacebookHandler from "./socialComponents/Facebook";
import GoogleHandler from "./socialComponents/Google";
import TwitterHandler from "./socialComponents/Twitter";


export default function SocialWrapper({ setErrorInfo }) {
    return (
        <section aria-label="social login">
            <GoogleHandler setErrorInfo={setErrorInfo} />
            <FacebookHandler setErrorInfo={setErrorInfo} />
            <TwitterHandler setErrorInfo={setErrorInfo} />
        </section>
    );
};