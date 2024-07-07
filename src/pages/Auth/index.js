import classNames from "classnames/bind";
import styles from "./Auth.module.scss";

import * as UserServices from "~/services/UserServices";
import * as message from "~/components/Message";
import { updateUser } from "~/redux/slides/userSlide";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutationHooks } from "~/hooks/useMutationHooks";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Loading from "~/components/LoadingComponent";

const cx = classNames.bind(styles);

export default function Auth() {
  const [stateShowForm, setStateShowFrom] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowForm = (state) => {
    setEmail("");
    setPassword("");
    setStateShowFrom(state);
  };

  const handleValueEmail = (email) => {
    setEmail(email);
  };

  const handleValuePassword = (password) => {
    setPassword(password);
  };

  const handleValueConfirmPassword = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
  };

  function validateEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  // Sign In ===========================================================================
  const handleLogin = async (event) => {
    event.preventDefault();

    if (email === "" || password === "") {
      return message.error("Chưa nhập đủ thông tin");
    }

    if (validateEmail(email)) {
      const signInInfor = {
        email,
        password,
        confirmPassword,
      };

      mutationSignIn.mutate(signInInfor);
    } else message.error("Email sai định dạng");
  };

  const mutationSignIn = useMutationHooks((data) =>
    UserServices.loginUser(data)
  );
  const {
    data,
    isPending: isPendingSignIn,
    isSuccess,
    isError,
  } = mutationSignIn;

  useEffect(() => {
    if (isSuccess) {
      message.success("Đăng nhập thành công");
      navigate("/");
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailUser(decoded?.id, data?.access_token);
        }
      }
    } else if (isError) {
      message.error("Đăng nhập thất bại");
    }
  }, [isSuccess]);

  const handleGetDetailUser = async (id, token) => {
    const res = await UserServices.getDetailUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };
  // ===================================================================================

  // Sign Up============================================================================

  const handleRegister = async (event) => {
    event.preventDefault();
    if (email === "" || password === "" || confirmPassword === "")
      return message.error("Chưa nhập đủ thông tin");
    if (validateEmail(email)) {
      if (password !== confirmPassword)
        return message.error("Mật khẩu không trùng khớp");

      const signUpInfor = {
        email,
        password,
        confirmPassword,
      };

      mutationSignUp.mutate(signUpInfor);
    } else {
      return message.error("Sai định dạng email");
    }
  };

  const mutationSignUp = useMutationHooks((data) => UserServices.signUp(data));
  const {
    isPending: isPendingSignUp,
    isSuccess: isSuccessSignUp,
    isError: isErrorSignUp,
  } = mutationSignUp;

  useEffect(() => {
    if (isSuccessSignUp) {
      message.success("Đăng ký thành công");
      handleShowForm(false);
    } else if (isErrorSignUp) {
      message.error("Đăng ký thất bại");
    }
  }, [isSuccessSignUp, isErrorSignUp]);

  // ===================================================================================

  function handleHideAuthForm(e) {
    e.preventDefault();
  }

  return (
    <>
      <div>
        {stateShowForm === false ? (
          <Loading isPending={isPendingSignIn}>
            <div
              className={cx(
                "form-container",
                "form-container--flexible",
                "login"
              )}
            >
              <div className={cx("Container-header-form-login")}>
                <p className={cx("title")}>Đăng nhập</p>
                <div
                  className={cx("Container-header-form-login_btn-exits")}
                ></div>
              </div>
              <form className={cx("form")}>
                <input
                  type="email"
                  className={cx("input")}
                  placeholder="Email"
                  value={email}
                  required
                  onChange={(event) => handleValueEmail(event.target.value)}
                />
                <input
                  type="password"
                  className={cx("input")}
                  placeholder="Password"
                  required
                  name={password}
                  value={password}
                  onChange={(event) => handleValuePassword(event.target.value)}
                />
                <p className={cx("page-link")}>
                  <span className={cx("page-link-label")}>Quên tài khoản?</span>
                </p>
                <button
                  className={cx("form-btn")}
                  onClick={(event) => handleLogin(event, email, password)}
                >
                  <span> Đăng nhập</span>
                </button>
                <button
                  className={cx("form-btn", "btn-nomal")}
                  onClick={(e) => handleHideAuthForm(e)}
                >
                  Về trang chủ
                </button>
              </form>
              <p className={cx("sign-up-label")}>
                Bạn chưa có tài khoản?
                <span
                  className={cx("sign-up-link")}
                  onClick={() => handleShowForm(true)}
                >
                  Đăng ký
                </span>
              </p>
            </div>
          </Loading>
        ) : (
          <Loading isPending={isPendingSignUp}>
            <div className={cx("form-container", "register")}>
              <p className={cx("title")}>Đăng ký tài khoản</p>
              <form className={cx("form")}>
                <input
                  type="email"
                  value={email}
                  className={cx("input")}
                  placeholder="Email"
                  onChange={(event) => handleValueEmail(event.target.value)}
                  required
                />
                <input
                  type="password"
                  className={cx("input")}
                  placeholder="Password"
                  value={password}
                  onChange={(event) => handleValuePassword(event.target.value)}
                />
                <input
                  type="password"
                  className={cx("input")}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(event) =>
                    handleValueConfirmPassword(event.target.value)
                  }
                />
                <button
                  className={cx("form-btn")}
                  onClick={(event) => handleRegister(event)}
                >
                  Đăng ký
                </button>
                <button
                  className={cx("form-btn", "btn-nomal")}
                  onClick={(e) => handleHideAuthForm(e)}
                >
                  Về trang chủ
                </button>
              </form>
              <p className={cx("sign-up-label")}>
                Bạn đã có tài khoản?
                <span
                  className={cx("sign-up-link")}
                  onClick={() => handleShowForm(false)}
                >
                  Đăng nhập
                </span>
              </p>
            </div>
          </Loading>
        )}
      </div>
    </>
  );
}
