
import {RiFilter2Fill} from "react-icons/ri";
import styles from "./styles/sortpanel.module.css";

const SortPanel =  (props)=>{
    return(
        <div className={styles.panel}>
            <div className={styles.panel__label}>
                <RiFilter2Fill />
                <span> Filter Articles</span>
            </div>
            <nav>
                <ul>
                    <li>
                        <input type="radio" checked={true}  />
                        <div>For you</div>
                    </li>
                    <li>
                        <input type="radio" checked={true} />
                        <div>Recent</div>
                    </li>
                    <li>
                        <input type="radio" checked={true} />
                        <div>Popular</div>
                    </li>
                </ul>
            </nav>
        </div>
    )
};


export default SortPanel;