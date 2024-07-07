import classNames from "classnames/bind";
import styles from "./Header.module.scss";

import * as UserServices from "~/services/UserServices";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faCartShopping,
  faMagnifyingGlass,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

import { Badge } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetUser } from "~/redux/slides/userSlide";

const cx = classNames.bind(styles);

function Header() {
  const [openDropDown, setOpenDropDown] = useState(false);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const types = ["Apple", "Xiaomi", "Samsung"];

  const handleToggleDropDown = (e) => {
    setOpenDropDown(!openDropDown);
  };

  const handleLogout = async () => {
    await UserServices.logoutUser();
    dispatch(resetUser());
  };

  return (
    <div className={cx("header__wrapper")}>
      <h2 onClick={() => navigate("/")} className={cx("store__name")}>
        shop
      </h2>

      <div className={cx("navigate__section")}>
        <ul className={cx("navigate__list")}>
          <li>Trang chủ</li>
          <li onClick={() => navigate("/product")} className={cx("type__btn")}>
            Danh mục
            <FontAwesomeIcon className={cx("more__icon")} icon={faSortDown} />
            <ul style={{ width: "120px" }} className={cx("types__list")}>
              {types.map((type, index) => {
                return <li key={index}>{type}</li>;
              })}
            </ul>
          </li>
          <li>About</li>
        </ul>
      </div>

      <div className={cx("search__section")}>
        <input
          className={cx("search__input")}
          type="text"
          placeholder="Nhập tên sản phẩm"
        />
        <FontAwesomeIcon
          className={cx("search__icon")}
          icon={faMagnifyingGlass}
        />
      </div>

      <div className={cx("contact__section")}>
        <div onClick={() => navigate("/cart")} className={cx("cart__section")}>
          <Badge
            className={cx("cartItem__count")}
            count={1}
            color="#009981"
            offset={[-5, 3]}
          >
            <FontAwesomeIcon
              className={cx("cart__icon")}
              style={{ color: "var(--WHITE)", fontSize: "16px" }}
              icon={faCartShopping}
            />
          </Badge>
        </div>

        {user?.access_token ? (
          <div className={cx("user__section")}>
            <FontAwesomeIcon className={cx("user__icon")} icon={faUser} />

            <div onClick={handleToggleDropDown} className={cx("user__name")}>
              {user?.name ? user?.name : user.email.split("@")[0]}
            </div>
            {openDropDown && (
              <ul className={cx("task__section")}>
                <li onClick={() => navigate("/profile")}>Thông tin</li>
                <li>Đơn hàng</li>
                <li onClick={() => navigate("/system-admin")}>Hệ thống</li>
                <li onClick={handleLogout}>Đăng xuất</li>
              </ul>
            )}
          </div>
        ) : (
          <div className={cx("user__section")}>
            <FontAwesomeIcon className={cx("user__icon")} icon={faUser} />
            <button
              onClick={() => navigate("/auth")}
              className={cx("user__btn")}
            >
              Đăng nhập
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
