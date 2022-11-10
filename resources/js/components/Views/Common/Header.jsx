import { Link } from "react-router-dom";

/**
 * Header component for the application
 *
 * @param {sidemenu, isAuth} param0 parameter contains reference from sidemenu and state of authentication
 * @returns JSX.Element
 */
function Header({sidemenu, isAuth}){

    const toggleMenu = () => {
        sidemenu.current.classList.toggle('active');
    };

    return(
        <header style={{minHeight:'5rem', zIndex:'100'}}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark h-100 px-3">
                <div className="d-flex flex-row">
                    {
                        isAuth &&
                        <button className="btn btn-dark me-2" onClick={toggleMenu} type='button'>
                            <span className="bi bi-list text-light h4"></span>
                        </button>
                    }
                    <Link className="navbar-brand" to={'/'}>
                        <img src={"http://localhost:8000/img/Jumpstart Logo.png"} style={{height:50, width:50}}/>
                        <span className="ms-3">
                            Jumpstart
                        </span>
                    </Link>
                </div>

            </nav>
        </header>
    );
}

export default Header;
