import { SpreadLoader } from "components/others";
import Main from "components/others/MainWrapper";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { baseAxiosInstance } from "utils/requests";

import styles from "./styles/email.module.css";



const EmailSent = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccessful, setIsSuccessful] = useState(true);
    const location = useLocation();
    const action = location.state.action;
    const payload = location.state.payload;
    const url = location.state.url;

    useEffect(() => {
        baseAxiosInstance({ url: url, method: "get", params: payload })
            .then((resp) => {
                setIsSuccessful(resp.status <= 200);
            })
            .catch((resp) => {
                setIsSuccessful(false);
            })

        setIsLoading(false);
    }, [payload, url]);

    const success = (
        <div>
            <h3>An Email has been sent to <i>{Object.values(payload)[0]}</i>. Kindly visit your email address to {action}</h3>
            <Link to="/">Home</Link>
        </div>
    );
    const failure = (
        <div>
            <h3>Looks like an error occurred.</h3>
            <Link to="/">Home</Link>
        </div>
    );

    const message = isSuccessful ? success : failure;

    return (
        <Main>
            <div className={styles.container}>
                {isLoading &&
                    <div className={styles.loadholder}>
                        <div>
                            <SpreadLoader />
                        </div>
                        <div className={styles.text}>
                            <i>Please wait...</i>
                        </div>
                    </div>
                }
                {!isLoading && <div className={styles.message}>{message}</div>}
            </div>
        </Main>
    )
};

export default EmailSent;