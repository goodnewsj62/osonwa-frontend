import DropDownInput from "components/others/forms/DropDownInput";
import useAuthAxios from "hooks/authAxios";
import { useState } from "react";
import { AiFillInfoCircle, AiOutlineClose } from "react-icons/ai";
import { GoTriangleLeft } from "react-icons/go";
import BundleOrder from "./BundleOrder";
import useFetchTags from "./hooks/fetchtags";
import useHideDropdownOnClickOustside from "./hooks/hideDropDown";

import styles from "./styles/advanced.module.css";

const BundleOptions = ({ dispatch, fieldVals }) => {
    const [showhints, setShowhints] = useState(false);
    const [selectedBundle, setSelectedBundle] = useState({});
    const [inputValue, setInputValue] = useState("");
    const axiosInstance =  useAuthAxios();

    const [fetchedBundles, isLoading] = useFetchTags(inputValue, "");
    useHideDropdownOnClickOustside("#bundle_dropdown", setShowhints);

    function setHandler(event) {
        const [selected] = fetchedBundles.filter((item) => item.id === +event.target.getAttribute("data-id"));
        setSelectedBundle(selected);
        dispatch({ type: "bundle", payload: selected.id });
        setShowhints(false);
    }

    const bundles = fetchedBundles.map((item) => {
        return (
            <div onClick={setHandler} data-id={item.id} key={item.id}>
                {item.tag_name}
            </div>
        )
    });

    const removeBundle =  (event)=>{
        setSelectedBundle({});
        dispatch({ type: "bundle", payload:0 });
    };

    const createAndAdd= async ()=>{
        if(selectedBundle) return;

        try{
            const resp =  await axiosInstance.post("/blog/bundle/", {"topic": inputValue});
            setSelectedBundle(resp.data.data);
        }catch(err){}
    };

    const changeHandler = (event)=>{
        setInputValue(event.target.value);
    };

    const params = {
        changeFunc: changeHandler,
        focusFunc: ()=> setShowhints(true),
        value: inputValue,
        placeholder: "find or create bundle",
        disabled: selectedBundle.id? true : false
    }
    

    return (
        <div className={styles.bundles}>
            <div className={styles.info}>
                <span>
                    <AiFillInfoCircle size={25} />
                </span>
                <div className={styles.message}>
                    <span><GoTriangleLeft size={20} /></span>
                    <p>Closely related articles can be ordered sequentially and grouped as a bundle.</p>
                </div>
            </div>
            <div className={styles.select__bundle}>
                <div id="bundle_dropdown" className={styles.select__bundles} >
                    {
                        !selectedBundle.id &&
                        <DropDownInput params={params}
                            show={showhints}
                            isLoading={isLoading}
                            suggestions={bundles}
                            createAndAdd={createAndAdd}
                        />
                    }
                    
                    {
                        selectedBundle.id &&
                        <div className={styles.choosen}>
                            <div className={styles.chosen_bun}>
                                <span className={styles.bn__nm}> 
                                {selectedBundle.topic}</span>
                                <span onClick={removeBundle} className={styles.rm__bun}>
                                    <AiOutlineClose size={17} />
                                </span>
                            </div> 
                        </div>
                    }
                </div>
                <>
                    <BundleOrder dispatch={dispatch} orderVal={fieldVals.orderVal} />
                </>
            </div>
        </div>
    )
};

export default BundleOptions;