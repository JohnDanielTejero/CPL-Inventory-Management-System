function Mainlayout({children:children}){
    return(
        <div style={{height:'100vh'}} className="overflow-hidden">
            {children}
        </div>
    );
}

export default Mainlayout;
