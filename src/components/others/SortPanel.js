
import { useEffect, useRef, useState } from "react";
import { RiFilter2Fill } from "react-icons/ri";
import styles from "./styles/sortpanel.module.css";

const SortPanel = ({ filterParams, setFilterParams }) => {
    const [showPanel, setShowPanel] = useState(false);
    const forYouRef = useRef();


    const toggleShow = (event) => {
        setShowPanel((state) => !state);
    };

    useEffect(() => {
        //mark for you when page is loaded 
        if (showPanel && filterParams.indexOf("for you") !== -1) {
            const radio = forYouRef.current.children[0];
            const radio_hidden = forYouRef.current.children[1];

            radio_hidden.checked = true;
            radio.checked = true;
        }
    }, [showPanel, filterParams]);

    const filterBy = (event, action) => {
        const radio = event.target.children[0];
        const radio_hidden = event.target.children[1];
        const radioState = radio.checked;

        if (radioState)
            radio_hidden.checked = true;
        else
            radio.checked = true;


        if (filterParams.indexOf(action) === -1 && !radioState)
            setFilterParams((state) => [...state, action]);
        else if (filterParams.indexOf(action) !== -1 && !radioState === false) {
            setFilterParams((state) => {
                return state.filter((item) => item !== action);
            });
        }
    };

    const setDisplay = { display: "none" };


    return (
        <div className={styles.panel}>
            <div onClick={toggleShow} className={styles.panel__label}>
                <RiFilter2Fill />
                <span> Filter Articles</span>
            </div>
            {
                showPanel &&
                <nav>
                    <ul>
                        <li ref={forYouRef} onClick={(e) => { filterBy(e, "for you") }}>
                            <input type="radio" name="filter_f" />
                            <input style={setDisplay} type="radio" name="filter_f" />
                            <div>For you</div>
                        </li>
                        <li onClick={(e) => { filterBy(e, "recent") }}>
                            <input type="radio" name="filter_r" />
                            <input style={setDisplay} type="radio" name="filter_r" />
                            <div>Recent</div>
                        </li>
                        <li onClick={(e) => { filterBy(e, "popular") }} >
                            <input type="radio" name="filter_p" />
                            <input style={setDisplay} type="radio" name="filter_p" />
                            <div>Popular</div>
                        </li>
                    </ul>
                </nav>
            }
        </div>
    )
};


export default SortPanel;