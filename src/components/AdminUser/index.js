import classNames from "classnames/bind";
import styles from "./AdminUser.module.scss";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import { Button, Form, Input, Space } from "antd";

import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useMutationHooks } from "~/hooks/useMutationHooks";

import TableComponent from "~/components/TableComponent";
import ModalComponent from "~/components/ModalComponent";
import DrawerComponent from "~/components/DrawerComponent";
import * as UserServices from "~/services/UserServices";

const cx = classNames.bind(styles);

function AdminUser() {
  const [form] = Form.useForm();
  const user = useSelector((state) => state?.user);

  // Create User========================================================

  const getAllUsers = async () => {
    const res = await UserServices.getAllUser(user?.access_token);
    return res;
  };

  const queryUser = useQuery({
    queryKey: ["user"],
    queryFn: getAllUsers,
  });

  const { data: users } = queryUser;

  // ===================================================================

  // Update User========================================================
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    isAdmin: false,
  });

  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await UserServices.getDetailUser(rowSelected);
    if (res?.data) {
      setStateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        address: res?.data?.address,
        isAdmin: res?.data?.isAdmin,
      });
    }
  };

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsUser(rowSelected);
    }
  }, [rowSelected]);

  const handleDetailsUser = () => {
    if (rowSelected) {
      fetchGetDetailsUser(rowSelected);
    }
    setIsOpenDrawer(true);
  };

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserServices.updateUser(id, { ...rests }, token);
    return res;
  });

  const { data: dataUpdated, isSuccess: isSuccessUpdated } = mutationUpdate;

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      handleCloseDrawer();
    }
  }, [isSuccessUpdated]);

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      address: "",
      isAdmin: false,
    });
    form.resetFields();
  };

  const onUpdateUser = () => {
    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        ...stateUserDetails,
      },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };

  // ===================================================================

  // Delete User========================================================
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteUser = () => {
    mutationDelete.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };

  const mutationDelete = useMutationHooks((data) => {
    const { id, token } = data;
    const res = UserServices.deleteUser(id, token);
    return res;
  });

  const { data: dataDeleted, isSuccess: isSuccessDeleted } = mutationDelete;

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      handleCancelDelete();
    }
  }, [isSuccessDeleted]);

  // ===================================================================

  // Delete Many User===================================================
  const handleDeleteManyUser = (ids) => {
    mutationDeleteMany.mutate(
      { ids: ids, token: user?.access_token },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };

  const mutationDeleteMany = useMutationHooks((data) => {
    const { token, ...ids } = data;
    const res = UserServices.deleteManyUser(ids, token);
    return res;
  });

  // ===================================================================

  const renderAction = () => {
    return (
      <div className={cx("action__wrapper")}>
        <FontAwesomeIcon
          style={{
            color: "red",
            marginRight: "16px",
            fontSize: "18px",
            cursor: "pointer",
          }}
          icon={faTrash}
          onClick={() => setIsModalOpenDelete(true)}
        />
        <FontAwesomeIcon
          style={{ color: "blue", fontSize: "18px", cursor: "pointer" }}
          icon={faPen}
          onClick={handleDetailsUser}
        />
      </div>
    );
  };

  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Address",
      dataIndex: "address",
      ...getColumnSearchProps("address"),
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      filters: [
        {
          text: "True",
          value: true,
        },
        {
          text: "False",
          value: false,
        },
      ],
      onFilter: (value, record) => {
        if (value === true) {
          return record.isAdmin === "True";
        }
        return record.isAdmin === "False";
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  const dataTable =
    users?.data?.length &&
    users?.data?.map((user) => {
      return {
        ...user,
        key: user._id,
        isAdmin: user?.isAdmin ? "True" : "False",
      };
    });

  return (
    <div className={cx("adminUser__wrapper")}>
      <h2 className={cx("adminUser__header")}>Quản lý người dùng</h2>
      {/* <div className={cx("btn__section")}>
          <button className={cx("adminUser__btn")}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div> */}

      <div className={cx("table__section")}>
        <TableComponent
          handleDeleteMany={handleDeleteManyUser}
          columns={columns}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        />
      </div>

      <DrawerComponent
        title="Chi tiết người dùng"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
      >
        <Form
          className={cx("form__section")}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 32 }}
          onFinish={onUpdateUser}
          autoComplete="off"
          labelAlign="left"
          form={form}
        >
          <Form.Item
            label="Tên"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your Name!",
              },
            ]}
          >
            <Input
              name="name"
              value={stateUserDetails.name}
              onChange={handleOnChangeDetails}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              name="email"
              value={stateUserDetails.email}
              onChange={handleOnChangeDetails}
            />
          </Form.Item>

          <Form.Item
            label="Điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your Phone!",
              },
            ]}
          >
            <Input
              name="phone"
              value={stateUserDetails.phone}
              onChange={handleOnChangeDetails}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 20,
              span: 18,
            }}
          >
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </DrawerComponent>

      <ModalComponent
        title="Xóa tài khoản"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteUser}
        forceRender
      >
        <div className={cx("delete__text")}>
          Bạn có chắc muốn xóa tài khoản này không???
        </div>
      </ModalComponent>
    </div>
  );
}

export default AdminUser;
