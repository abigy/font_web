import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { publicRoutes } from "~/routes";
import { DefaultLayout } from "~/components/Layouts";
import SiderBar from "./components/Layouts/DefaultLayouts/Sidebar/SiderBar";
import * as UserServices from "~/services/UserServices";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/slides/userSlide";

//import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const { decoded, storeData } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storeData);
    }
  }, []);

  const handleGetDetailUser = async (id, token) => {
    const res = await UserServices.getDetailUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleDecoded = () => {
    let storeData = localStorage.getItem("access_token");
    let decoded = {};
    if (storeData && isJsonString(storeData)) {
      storeData = JSON.parse(storeData);
      decoded = jwtDecode(storeData);
    }
    return { decoded, storeData };
  };

  UserServices.axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserServices.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            const Page = route.component;
            const isCheckAuth = !route.isPrivate || user.isAdmin;
            return (
              <Route
                key={index}
                path={isCheckAuth ? route.path : undefined}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          <Route element={<SiderBar></SiderBar>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
