function Sidebar({reference}){
    return(
        <aside className = "bg-danger d-flex flex-column h-100 side-menu active" ref = {reference}>
            <div className="border border-1 rounded-1 border-dark w-100 bg-dark bg-gradient bg-opacity-50 flex-fill">

            </div>
            <div className="border border-1 rounded-1 border-dark w-100 bg-dark bg-gradient bg-opacity-50" style={{height:'5rem'}}>

            </div>
        </aside>
    );
}

export default Sidebar;
