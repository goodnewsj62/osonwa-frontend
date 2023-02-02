import styles from "./styles/tofro.module.css";


const InfinteToFroBar = ({ style = {} }) => {
    return (
        <div className={styles.bar} style={style}>
            <div>
                <span></span>
            </div>
        </div>
    )
};


export default InfinteToFroBar;