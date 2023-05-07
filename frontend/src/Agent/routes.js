import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";

//
import BlogPage from "./pages/BlogPage";
import UserPage from "./pages/UserPage";

import ProductsPage from "./pages/ProductsPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import ViewAssign from "./pages/ViewAssign";
import ViewVoters from "./pages/ViewVoters";
import VoteVerification from "./pages/VoteVerification";
import ViewCandidate from "./pages/ViewCandidate";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/Agent/app" />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        { path: "user", element: <UserPage /> },
        { path: "products", element: <ProductsPage /> },
        { path: "blog", element: <BlogPage /> },
        { path: "ViewAssign", element: <ViewAssign /> },
        { path: "ViewVoters/:wid", element: <ViewVoters /> },
        { path: "VoteVerification/:wid/:eid", element: <VoteVerification /> },
        { path: "ViewCandidate", element: <ViewCandidate /> },
        
      ],
    
    },
   
    
  ]);

  return routes;
}
