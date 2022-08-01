import Nav from "./nav";
import SearchBar from "./search_bar";

function Header(){
    return (
        <header>
            <div className="logo__area">
                <h2>Osonwa.</h2>
            </div>
            <SearchBar />
            <Nav />
        </header>
    )   
}

export default Header;