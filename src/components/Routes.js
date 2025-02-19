import { Outlet } from "react-router-dom";
import ContextProvider from "./ContextProvider";
import Navigation from "./Navigation";
import UniversityList from "./UniversityList";
import UniversityDetails from "./UniversityDetails";
import Admin from "./Admin";
import ErrorPage from "./ErrorPage";

const App=()=>(
  <ContextProvider>
    <div className="bg-secondary d-flex flex-column min-vh-100 align-items-center justify-content-center">
      <Navigation/>
      <Outlet/>
    </div>
  </ContextProvider>
);

const routes=[
  {
    element:<App/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        path:"/",
        element:<UniversityList/>,
      },
      {
        path:"/university/:id",
        element:<UniversityDetails/>,
      },
      {
        path:"/admin",
        element:<Admin/>,
      },
    ],
  },
];

export default routes;