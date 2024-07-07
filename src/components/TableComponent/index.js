import classNames from "classnames/bind";
import styles from "./TableComponent.module.scss";
import React, { useState } from "react";

import { Table } from "antd";

// import { Excel } from "antd-table-saveas-excel";

const cx = classNames.bind(styles);

function TableComponent(props) {
  const {
    selectionType = "checkbox",
    data: dataSource = [],
    columns = [],
    handleDeleteMany,
  } = props;

  const [rowSelectedKey, setRowSelectedKeys] = useState([]);
  //   const newCollumnsExport = useMemo(() => {
  //     const arr = columns?.filter((col) => col.dataIndex !== "action");
  //     return arr;
  //   }, [columns]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys);
      console.log(`selectedRowKeys: ${selectedRowKeys}`);
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === "Disabled User",
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  };

  const handleDeleteAll = () => {
    handleDeleteMany(rowSelectedKey);
  };

  //   const handleExportExcel = () => {
  //     const excel = new Excel();
  //     excel
  //       .addSheet("Data")
  //       .addColumns(newCollumnsExport)
  //       .addDataSource(dataSource, {
  //         str2Percent: true,
  //       })
  //       .saveAs("Data.xlsx");
  //   };

  return (
    <div className={cx("tableComponent__wrapper")}>
      <div>
        {/* <button onClick={handleExportExcel} className={cx("export__btn")}>
          Tạo File Excel
        </button> */}

        {rowSelectedKey.length > 0 && (
          <button onClick={handleDeleteAll} className={cx("deleteAll__btn")}>
            Xóa tất cả
          </button>
        )}

        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={dataSource}
          {...props}
        />
      </div>
    </div>
  );
}

export default TableComponent;
