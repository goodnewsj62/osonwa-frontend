import styles from "./styles/errorPage.module.css";

const ErrorPage =  ({statusCode, image, message})=>{
    return(
        <section aria-label="err__message" className={styles.wrapper}>
            <div className={styles.image}>
                <img src={image} alt="" />
            </div>
            <h1>{statusCode}</h1>
            <p id="err__message"><i>{message}</i></p>
        </section>
    )
};


export default ErrorPage;