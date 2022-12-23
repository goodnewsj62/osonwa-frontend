import Main from "components/others/MainWrapper";
import ToggleContents from "components/others/ToggleContent";
import { DefaultIconSize } from "components/wrappers/IconSize";
import { useContext } from "react";
import { BiSearch } from "react-icons/bi";





const Saved =  ()=>{
    const iconSize =  useContext(DefaultIconSize);

    
    return (
        <Main>
            <div className={``}>
                <section className={``}>
                    <h1>Saved</h1>
                    <div className={``}>
                        <ToggleContents stateNames={contentNames} components={components} callback={onScreen} />
                    </div>
                </section>
                <section className={``}>
                    <form onSubmit={()=>{}} action="">
                        <span>
                            <button type="submit">
                                <BiSearch size={iconSize}/>
                            </button>
                        </span>
                        <div className={``}>
                            <label id="gensearch__label"
                                htmlFor="general__search">
                                    Search Saved
                            </label>
                        </div>
                        <input type="text" 
                            autoComplete="off" 
                            autoCorrect="off" 
                            id="general__search"
                            aria-labelledby="gensearch__label"
                            value={""}
                        />
                    </form>
                </section>
            </div>
        </Main>
    );
};

export default Saved;