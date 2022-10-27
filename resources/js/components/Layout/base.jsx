function Mainlayout({children:children}){
    return(
        <div style={{height:'100vh', width:'100vw'}} className="overflow-hidden">
            {children}
        </div>
    );
}

export default Mainlayout;
