import classNames from "classnames/bind";
import styles from "./Cart.module.scss";

//import productImg from "~/assets/img/ip.webp";

const cx = classNames.bind(styles);

function Cart() {
  return (
    <div className={cx("cart__wrapper")}>
      <div className={cx("cart__section")}>
        <div className={cx("cartProduct__infor")}></div>
      </div>
    </div>
  );
}

export default Cart;
