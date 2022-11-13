import { useState, useEffect } from "react";
import userCrud from "../../Configurations/ApiCalls/user-crud";
import debounce, { dateToHumanReadable } from "../../Configurations/constants";

/**
 * Component to display all employees
 *
 * @returns JSX.Element
 */
function EmployeeList(){

    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(async () => {

        let activeEmployees = await userCrud.getAllUsers('');
        setEmployees(await activeEmployees);

        return(() => {
            setEmployees([]);
        });

    }, []);

    useEffect(async () => {

        const activeEmployees = await userCrud.getAllUsers(search);
        setEmployees(await activeEmployees);

        return(()=>{
            setEmployees([]);
            setSearch('');
        });
    }, [search]);

    const handleSearch = (e) => {
        debounce(setSearch(e.target.value));
    }

    const handleDelete = async (e) => {
        const deleteEmployee = await userCrud.deleteUser(e.target.getAttribute('data-employee-delete'));
        setEmployees(await deleteEmployee);
        setSearch('');
    }

    return(
        <>
            <section className="d-flex justify-content-end mb-2">
                <div className="form-floating">
                    <input
                        className="form-control bg-input text-light border border-dark"
                        id = "search"
                        placeholder="..."
                        autoComplete="off"
                        onChange={handleSearch}
                    />
                    <label htmlFor="search" className="text-light">Search</label>
                </div>
            </section>
            <section className="table-responsive w-100" style={{height:'30rem', overflowY:'auto'}}>
                <table className="table table-dark jumpstart-table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Email</th>
                            <th>Affiliated Store</th>
                            <th>Joined At</th>
                            <th>Modified At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map((e) => {
                                return(
                                    <tr style={{height:"5rem", overflow:"hidden"}} key = {e.user_id}>
                                        <td style={{width:"5rem"}}>{ e.first_name + " " + e.last_name }</td>
                                        <td style={{width:"6rem"}}>{ e.email }</td>
                                        <td style={{width:"5rem"}}>{ e.Store_Name }</td>
                                        <td style={{width:"5rem"}}>{ dateToHumanReadable(e.created_at) }</td>
                                        <td style={{width:"5rem"}}>{ dateToHumanReadable(e.modified_at) }</td>
                                        <td style={{width:"5rem"}} className="p-2">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <button className="btn btn-dark jumpstart ms-2" data-employee-delete = {e.user_id} onClick ={handleDelete}>
                                                    <i className="bi bi-trash" style = {{pointerEvents:'none'}}></i>
                                                    <span className = "ms-1" style = {{pointerEvents:'none'}}>Delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                )
                            })
                        }
                    </tbody>
                </table>
            </section>
        </>
    );
}

export default EmployeeList;

