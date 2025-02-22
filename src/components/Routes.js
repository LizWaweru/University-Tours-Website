import { Outlet } from "react-router-dom";
import ContextProvider from "./ContextProvider";
import Navigation from "./Navigation";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import UniversityDetails from "./UniversityDetails";
import Admin from "./Admin";
import ErrorPage from "./ErrorPage";

const App=()=>(
  <ContextProvider>
    <div className="bg-secondary d-flex flex-column min-vh-100">
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
        element:<HomePage/>,
      },
      {
        path:"/about",
        element:<AboutPage/>,
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