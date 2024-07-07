import classNames from "classnames/bind";
import styles from "./CardProduct.module.scss";

import productImg from "~/assets/img/ip.webp";

const cx = classNames.bind(styles);

function CardProduct() {
  return (
    <div className={cx("cardProduct__wrapper")}>
      <div className={cx("product__img")}>
        <img src={productImg} alt="phone" />
      </div>

      <div className={cx("product__infor")}>
        <h4 className={cx("product__name")}>Ai phôn</h4>
        <p className={cx("product__des")}>Xịn xò</p>

        <div className={cx("product__price")}>
          <p className={cx("product__show")}>22.000.000đ</p>
          <p className={cx("product__through")}>23.000.000đ</p>
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
