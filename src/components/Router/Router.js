import React from 'react'
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import Layout  from "../../pages/Layout.js"
import AdminProducts from '../../pages/adminProducts/page.js';
import Products from '../../pages/products/page.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
		children: [
      {
        path: "products",
        element: <Products/>,
				handle:{
					crumb: (data) => <span>Home &gt; products</span>,
				},
      },
			{
        path: "admin/products",
        element: <AdminProducts/>,
				handle:{
					crumb: (data) => <span>Home &gt; admin products</span>,
				},
      },
    ],
  },
]);

export default function Router() {
  return (
    <RouterProvider router={router} />
  )
}
