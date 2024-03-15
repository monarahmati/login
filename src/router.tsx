import LoginPage from "pages/auth/login-page";
import PageGuard from "components/auth/page-guard";
import WellcomePage from "pages/wellcome-page";
import { createBrowserRouter } from "react-router-dom";
import { SidenavShape } from "types/layout-type";
import { sidenavsLayout } from "config/features/layout-config";

let routerItems = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/wellcome",
    element: <PageGuard render={<WellcomePage />} />,
  },
];

const getPages = (items: SidenavShape[]) => {
  let renderedPages: any[] = [];
  items.forEach((item) => {
    if (!Array.isArray(item.items)) {
      renderedPages.push({
        path: item.path || "/",
        element: item.element ? (
          <PageGuard render={<item.element />} permission={item.licenseName} />
        ) : (
          <WellcomePage />
        ),
      });
    } else {
      renderedPages = [...renderedPages, ...getPages(item.items)];
    }
  });

  return renderedPages;
};

const router = createBrowserRouter([
  ...routerItems,
  ...getPages(sidenavsLayout),
]);

export default router;
