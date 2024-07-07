import Home from "~/pages/Home";
// import SignIn from "~/pages/SignIn";
// import SignUp from "~/pages/SignUp";
import Admin from "~/pages/Admin";
import Profile from "~/pages/Profile";
import Cart from "~/pages/Cart";
import Auth from "~/pages/Auth";
import SiderBar from "~/components/Layouts/DefaultLayouts/Sidebar/SiderBar";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/cart", component: Cart },
  { path: "/profile", component: Profile },
  { path: "/auth", component: Auth, layout: null },
  { path: "/system-admin", component: Admin, isPrivate: true },
  { path: "/product", component: SiderBar },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
