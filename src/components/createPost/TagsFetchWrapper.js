import DropDownInput from "components/others/forms/DropDownInput";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { baseAxiosInstance } from "utils/requests";
import useFetchTags from "./hooks/fetchtags";
import useHideDropdownOnClickOustside from "./hooks/hideDropDown";



const TagsFetchWrapper = ({ setSelectedTags }) => {
    const [inputValue, setInputValue] = useState("");
    const [showhints, setShowhints] = useState(false);
    const authState = useSelector((states) => states.authState);
    const url = useMemo(() => "/blog/tag/search/?keyword=", [])


    const [fetchedTags, isLoading] = useFetchTags(inputValue, url);
    useHideDropdownOnClickOustside("#dropWrapper", setShowhints);

    function changeHandler(event) {
        const value = event.target.value;
        setInputValue(value);
    };

    function add(event) {
        const selected = fetchedTags.filter((item) => item.id === +event.target.getAttribute("data-id"));
        setSelectedTags((tags) => [...tags, ...selected]);
        setShowhints(false);
    }

    const tags = fetchedTags.map((item) => {
        return (
            <div onClick={add} data-id={item.id} key={item.id}>
                {item.tag_name}
            </div>
        )
    });


    const createAndAdd = async (event) => {
        if (!inputValue || inputValue.length < 2) return

        try {
            const url = "/blog/tag/"
            baseAxiosInstance.defaults.headers.common["Authorization"] = "Bearer " + authState.access;
            const resp = await baseAxiosInstance.post(url, { tag_name: inputValue })
            setSelectedTags((tags) => [...tags, resp.data.data])
        } catch (err) { }
    };



    const params = {
        focusFunc: () => setShowhints(true),
        // blurFunc: () => setShowhints(false),
        changeFunc: changeHandler,
        value: inputValue,
        placeholder: "find or create tag"
    }

    return (
        <div id="dropWrapper">
            <DropDownInput params={params}
                show={showhints}
                createAndAdd={createAndAdd}
                isLoading={isLoading}
                suggestions={tags}
            />
        </div>
    )
};


export default TagsFetchWrapper;