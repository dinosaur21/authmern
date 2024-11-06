import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { 
  Dashboard, 
  HomeLayout, 
  Landing, 
  Login, 
  Logout, 
  Register,
  ManufacturerRegister,
  ManufacturerLogin,
  ManufacturerDashboard,
  ManufacturerLogout
} from "./pages";
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      // User routes
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      // Manufacturer routes
      {
        path: "manufacturer",
        children: [
          {
            path: "register",
            element: <ManufacturerRegister />,
          },
          {
            path: "login",
            element: <ManufacturerLogin />,
          },
          {
            path: "dashboard",
            element: <ManufacturerDashboard />,
          },
          {
            path: "logout",
            element: <ManufacturerLogout />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position='top-center' />
    </>
  )
}

export default App;