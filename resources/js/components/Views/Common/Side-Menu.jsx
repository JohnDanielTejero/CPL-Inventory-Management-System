function Sidebar({reference}){
    return(
        <aside className = "bg-danger d-flex flex-column h-100 side-menu active" ref = {reference}>
            <div className="border border-1 rounded-1 border-dark w-100 bg-dark bg-gradient bg-opacity-50" style={{height:'85%', overflowY: 'auto'}}>
                {/* content here */}
            </div>

            <div className="overflow-hidden border border-1 rounded-1 border-dark w-100 bg-dark bg-gradient bg-opacity-50 flex-fill">
                tite
            </div>
        </aside>
    );
}

export default Sidebar;
