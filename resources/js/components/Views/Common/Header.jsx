function Header({sidemenu}){

    const toggleMenu = () => {
        sidemenu.current.classList.toggle('active');
    };

    return(
        <header style={{minHeight:'5rem', zIndex:'100'}}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light h-100 justify-content-between px-3">
                <div className="d-flex flex-row">
                    <button className="bi bi-list navbar-brand px-2 border rounded-3 border-1 border-dark" onClick={toggleMenu}></button>
                    <a className="navbar-brand" href="#">Navbar</a>
                </div>

            </nav>
        </header>
    );
}

export default Header;
