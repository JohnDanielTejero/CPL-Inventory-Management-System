function Mainlayout({children:children}){
    return(
        <div style={{height:'100vh'}} className="bg-info overflow-hidden">
            {children}
        </div>
    );
}

export default Mainlayout;
