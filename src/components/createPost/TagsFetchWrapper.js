import DropDownInput from "components/others/forms/DropDownInput";
import { useMemo, useState } from "react";



const TagsFetchWrapper = ({ setSelectedTags }) => {
    const [fetchedTags, setFetchedTags] = useState([]);

    const tags = fetchedTags.map((item) => {
        return (
            <div onClick={add} data-id={item.id} key={item.id}>
                {item.tag_name}
            </div>
        )
    });

    const params = useMemo(() => ({
        placeholder: "find or create tag"
    }), [])

    function add(event) {
        const selected = fetchedTags.filter((item) => item.id === event.target.getAttribute("data-id"));
        setSelectedTags((tags) => [...tags, ...selected])
    }
    const createAndAdd = async (event) => {

    };

    return (
        <>
            <DropDownInput params={params} createAndAdd={createAndAdd} suggestions={tags} />
        </>
    )
};


export default TagsFetchWrapper;