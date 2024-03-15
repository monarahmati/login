import LoginPage from "pages/auth/login-page";
import PageGuard from "components/auth/page-guard";
import WellcomePage from "pages/wellcome-page";
import { createBrowserRouter } from "react-router-dom";



const routerItems = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/wellcome",
    element: <PageGuard render={<WellcomePage />} />,
  },

];


// const extractRoutes = (items: SidenavShape[]) => {
//   let routes: any[] = [];
//   items.forEach((item) => {
//     if (!Array.isArray(item.items)) {
//       routes.push({
//         path: item.path || "/",
//         element: item.element ? (
//           <PageGuard render={<item.element />} permission={item.licenseName} />
//         ) : (
//           <WellcomePage />
//         ),
//       });
//     } else {
//       routes = [...routes, ...extractRoutes(item.items)];
//     }
//   });

//   return routes;
// };


const router = createBrowserRouter([...routerItems]);

export default router;
