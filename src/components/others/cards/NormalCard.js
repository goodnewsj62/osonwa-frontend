
import { useContext } from "react";


import NormalCardHeader from "./NormalCardHeader";
import NormalCardDetails from "./NormalCardDetails";
import NormalCardAction from "./NormalCardAction";
import { DefaultIconSize } from "components/wrappers/IconSize";

import style from "./styles/NormalCard.module.css";


function NormalCard({ post }) {
    const iconSize = useContext(DefaultIconSize);

    return (
        // TODO: break this component up
        <div className={style.normal__card}>
            <NormalCardHeader post={post} iconSize={iconSize} />
            <NormalCardDetails post={post} iconSize={iconSize} />
            <NormalCardAction post={post} iconSize={iconSize} />
        </div>
    );
};


export default NormalCard;