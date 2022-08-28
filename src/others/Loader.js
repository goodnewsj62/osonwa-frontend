import styles from "./styles/loader.module.css";

function SpreadLoader(props) {
    return (
        
        <div className={styles.base__spread}>
            <div className={styles.after__spread}></div>
            <div className={styles.inner__spread}>
            </div>
            <div className={styles.before__spread}>
            </div>
        </div>
    )
}


export { SpreadLoader };