import classNames from "classnames/bind";
import styles from "./Home.module.scss";

import slider from "~/assets/img/slider.webp";
import CardProduct from "~/components/CardProduct";

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx("home__wrapper")} style={{ height: "1500px" }}>
      <div className={cx("slider__section")}>
        <img className={cx("slider__img")} src={slider} alt="slider" />
      </div>

      <div className={cx("product__section")}>
        <h2 className={cx("product__header")}>Sản phẩm</h2>

        <div className={cx("product__list")}>
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </div>
      </div>

      <div className={cx("product__section")}>
        <h2 className={cx("product__header")}>Sản phẩm</h2>

        <div className={cx("product__list")}>
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </div>
      </div>
    </div>
  );
}

export default Home;
