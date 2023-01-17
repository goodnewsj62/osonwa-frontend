import styles from "./styles/loader.module.css";

function SpreadLoader(props) {
    const size = props.fullHeight ? { height: "100vh" } : {};
    return (
        <div className={styles.base__spread} style={size}>
            <div className={styles.after__spread}></div>
            <div className={styles.inner__spread}>
            </div>
            <div className={styles.before__spread}>
            </div>
        </div>
    )
}


export default SpreadLoader;