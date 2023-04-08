import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//import BlogPage, { loader as postsLoader } from './pages/Blog';
//buoc 1 xoa cai nay
import HomePage from "./pages/Home";
//import PostPage, { loader as postLoader } from "./pages/Post";
import RootLayout from "./pages/Root";
import { lazy, Suspense } from "react";

const BlogPage = lazy(() => import("./pages/Blog"));
// co the viet cac thanh phan duoi dang ham
// Sau do them <supsense></supsense>
const PostPage = lazy(() => import("./pages/Post"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "posts",
        children: [
          // { index: true, element: <BlogPage />, loader: postsLoader },
          // { path: ':id', element: <PostPage />, loader: postLoader },
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <BlogPage />
              </Suspense>
            ),
            loader: () =>
              import("./pages/Blog").then((module) => module.loader()),
          },
          //Nhapâp import trong ham la nhap dong va no se duoc nhap bat cu khi nao can thiet
          //Va de nhap bam can vuot qua q duong dang ben trong
          //Ke ben la cung cap 1 loi hua vi day la 1 quy trinh ko dong bo
          //Sau do nhan duoc module da tai va chuc nang trinh tai sau do se duoc thuc thi
          {
            path: ":id",
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <PostPage />
              </Suspense>
            ),
            loader: (meta) =>
              import("./pages/Post").then((module) => module.loader(meta)),
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
