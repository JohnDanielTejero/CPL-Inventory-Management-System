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
import SupplierForm from "../../Views/Suppliers/SupplierForm";
import StoresBase from "../../Views/Stores/StoresBase";
import StoresList from "../../Views/Stores/StoresList";
import StoresForm from "../../Views/Stores/StoresForm";
import CategoriesBase from "../../Views/Categories/CategoriesBase";
import Categories from "../../Views/Categories/CategoriesList";
import CategoryForm from "../../Views/Categories/CategoriesForm";
import SalesBase from "../../Views/Sales/SalesBase";
import SalesList from "../../Views/Sales/SalesList";
import SalesForm from "../../Views/Sales/SalesForm";
import SalesInformation from "../../Views/Sales/SalesInformation";
import Stocks from "../../Views/Stocks/StocksList";
import Login from "../../Views/Login";

function Routing({isAuth, login}){

    return(
        <Routes>
            {/* login */}
            <Route
                element = { <Login method = {login}/> }
                path = { "/login" }
            />

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


                <Route
                    element = { <SupplierForm/>}
                    path = "add-supplier"
                />

                <Route
                    element = { <SupplierForm/>}
                    path = "edit-supplier/:id"
                />

            </Route>

            {/* Stores */}
            <Route
                element = { <StoresBase/> }
                path="stores"
            >
                <Route
                    index
                    element = { <StoresList/> }
                />
                <Route
                    element = { <StoresForm/>}
                    path = "add-store"
                />

                <Route
                    element = { <StoresForm/>}
                    path = "edit-store/:id"
                />
            </Route>

            {/* Sales */}
            <Route
                element = { <SalesBase/> }
                path="sales"
            >
                <Route
                    index
                    element = { <SalesList/> }
                />
                <Route
                    element = { <SalesForm/>}
                    path = "add-sale"
                />

                <Route
                    element = { <SalesInformation/>}
                    path = "sale-information/:id"
                />
            </Route>

            {/* Category */}
            <Route
                element = { <Authenticated component={ <CategoriesBase/> } isAuth = {isAuth} /> }
                path="category"
            >
                <Route
                    index
                    element = { <Categories/> }
                />
                <Route
                    element = { <CategoryForm/>}
                    path = "add-category"
                />

                <Route
                    element = { <CategoryForm/> }
                    path = "edit-category/:id"
                />
            </Route>

            {/* Stocks */}
            <Route
                element = { <Stocks/> }
                path="stocks"
            >
            </Route>
        </Routes>
    );
}

export default Routing;
