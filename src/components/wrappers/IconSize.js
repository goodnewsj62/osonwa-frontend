import { createContext } from "react";
const DefaultIconSize = createContext();

const IconSize = ({ element }) => {
    return (
        <DefaultIconSize.Provider value={20}>
            {element}
        </DefaultIconSize.Provider >
    );
};


export { DefaultIconSize };
export default IconSize;
