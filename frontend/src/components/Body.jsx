import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import UserProfile from "./UserProfile";
import { Toaster } from "react-hot-toast";
import TaskPage from "./TaskPage";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path:"/taskpage",
      element:<TaskPage/>
    }
    ,
    {
      path: "/profile",
      element: <UserProfile />,
    },
  ]);
  return (
    <RouterProvider router={appRouter}>
        <div className="h-full w-full">Body</div>
    </RouterProvider>
  );
};

export default Body;
