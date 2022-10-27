import { Link } from "react-router-dom";

function Header({sidemenu}){

    const toggleMenu = () => {
        sidemenu.current.classList.toggle('active');
    };

    return(
        <header style={{minHeight:'5rem', zIndex:'100'}}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark h-100 px-3">
                <div className="d-flex flex-row">
                    <button className="btn btn-dark me-2" onClick={toggleMenu} type='button'>
                        <span className="bi bi-list text-light h4"></span>
                    </button>
                    <Link className="navbar-brand" to={'/'}>Jumpstart</Link>
                </div>

            </nav>
        </header>
    );
}

export default Header;
