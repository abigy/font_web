import classNames from "classnames/bind";
import styles from "./Admin.module.scss";

import { Menu } from "antd";
import { useState } from "react";
import { getItem } from "~/utils";
import {
  UserOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import AdminUser from "~/components/AdminUser";
import AdminProduct from "~/components/AdminProduct";

const cx = classNames.bind(styles);

function Admin() {
  const [keySelected, setKeySelected] = useState("");
  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      // case "order":
      //   return <AdminOrder />;
      default:
        return <></>;
    }
  };

  const items = [
    getItem("Người dùng", "user", <UserOutlined />),
    getItem("Sản phẩm", "product", <AppstoreOutlined />),
    getItem("Đơn hàng", "order", <ShoppingCartOutlined />),
  ];

  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };

  return (
    <div className={cx("admin__wrapper")}>
      <Menu
        onClick={handleOnClick}
        className={cx("menu__section")}
        mode="inline"
        items={items}
      />
      <div className={cx("render__section")}>{renderPage(keySelected)}</div>
    </div>
  );
}

export default Admin;
