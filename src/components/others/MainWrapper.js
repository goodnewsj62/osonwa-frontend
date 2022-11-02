
import { useSelector } from "react-redux";
import styles from "./styles/mainstyles.module.css";



const Main = (props) => {
    const barState = useSelector((state) => state.sideBarState);

    const main_classes = barState ? `main ${styles.futher__left}` : `main`;
    return (
        <main className={main_classes}>
            {props.children}
        </main>
    )
};



export default Main;