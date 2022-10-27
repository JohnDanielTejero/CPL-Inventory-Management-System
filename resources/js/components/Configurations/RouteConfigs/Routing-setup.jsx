import { Route, Routes } from "react-router-dom";
import Anonymous from "./AnonymousRoute";
import Authorization from "./AuthorizationRoute";
import Authenticated from "./AuthenticatedRoute";
import Dashboard from "../../Views/Home";
import ProductsBase from "../../Views/Products/Products-Base";
import Products from "../../Views/Products/Products-List";
import AddProduct from "../../Views/Products/Products-Form";
import ProductForm from "../../Views/Products/Products-Form";
import ProductDetails from "../../Views/Products/Product-Information";
import EmployeeBase from "../../Views/Employee/EmployeeBase";
import EmployeeList from "../../Views/Employee/Employee-List";
import RegisterEmployee from "../../Views/Employee/AddEmployee";
import Profile from "../../Views/Employee/EmployeeProfile";
import SuppliersBase from "../../Views/Suppliers/SuppliersBase";
import SuppliersList from "../../Views/Suppliers/SuppliersList";

function Routing(){
    return(
        <Routes>
            {/* Dashboard */}
            <Route
                element = { <Dashboard/> }
                index
            />

            {/* Products */}
            <Route
                element = { <ProductsBase/> }
                path="/products"
            >
                <Route
                    index
                    element = { <Products/> }
                />
                <Route
                    element = { <ProductForm/>}
                    path = "add-product"
                />

                <Route
                    element = { <ProductForm/> }
                    path="edit-product/:id"
                />

                <Route
                    element = { <ProductDetails/> }
                    path="product-information/:id"
                />
            </Route>

            {/* Employees */}
            <Route
                element = { <EmployeeBase/> }
                path="/employee"
            >
                <Route
                    index
                    element = { <EmployeeList/> }
                />
                <Route
                    element = { <RegisterEmployee/>}
                    path = "add-new-employee"
                />
            </Route>

            {/* Profile */}
            <Route
                element = { <Profile/> }
                path="profile"
            />
            {/* Suppliers */}
            <Route
                element = { <SuppliersBase/> }
                path="/suppliers"
            >
                <Route
                    index
                    element = { <SuppliersList/> }
                />

                {/*
                <Route
                    element = { <ProductForm/>}
                    path = "add-supplier"
                />

                <Route
                    element = { <ProductForm/> }
                    path="edit-supplier/:id"
                />
                */}


            </Route>


        </Routes>
    );
}

export default Routing;
