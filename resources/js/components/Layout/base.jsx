/**
 * Base layout component for the application
 *
 * @param {*} param0 children element of the component
 * @returns JSX.Element
 */
function Mainlayout({children:children}){
    return(
        <div style={{height:'100vh', width:'100vw'}} className="overflow-hidden">
            {children}
        </div>
    );
}

export default Mainlayout;
