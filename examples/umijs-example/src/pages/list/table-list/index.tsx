import {Button, Card, Dropdown, Menu} from 'antd';
import React, {Component} from 'react';
import PageHeaderWrapper from "@/pro-layout/PageHeaderWrapper";
import StandardTable, {StandardTableColumnProps, TableDataType} from './components/StandardTable';
import {TableListItem, TableListParams} from './data.d';

import styles from './style.less';
import {Key, SorterResult, TableCurrentDataSource} from 'antd/es/table/interface';
import {PaginationConfig} from "antd/es/pagination";
import {DownOutlined, PlusOutlined} from "@ant-design/icons";

// const FormItem = Form.Item;
// const {Option} = Select;


interface TableListState {
  modalVisible: boolean;
  updateModalVisible: boolean;
  expandForm: boolean;
  selectedRows: TableListItem[];
  formValues: { [key: string]: string };
  stepFormValues: Partial<TableListItem>;
  tableData: TableDataType;
  columns: StandardTableColumnProps[];
}

export interface TableListProps {

}


class TableList extends Component<TableListProps, TableListState> {


  state: TableListState = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: null,
    stepFormValues: null,
    tableData: null,
    columns: null
  };

  componentDidMount(): void {
    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ];

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
    ];

    this.setState({
      tableData: {
        pagination: {
          pageSize: 10,
          current: 1,
          total: 10
        },
        list: dataSource
      },
      columns
    })
  }

  render(): React.ReactElement {

    const {selectedRows, tableData, columns} = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );
    return (
      <PageHeaderWrapper content={"模板表格"}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            {/*<div className={styles.tableListForm}>{this.renderForm()}</div>*/}
            <div className={styles.tableListOperator}>
              <Button icon={<PlusOutlined/>}
                      type="primary"
                      onClick={() => {}}>新建</Button>
              {selectedRows.length > 0 && (
                <span>
                    <Button>批量操作</Button>
                    <Dropdown overlay={menu}>
                      <Button>
                        更多操作 <DownOutlined/>
                      </Button>
                    </Dropdown>
                  </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={false}
              data={tableData}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }

  private handleSelectRows = (rows: TableListItem[]) => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleStandardTableChange = (
    pagination: PaginationConfig,
    filters: Record<string, Key[] | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>
  ) => {
    const {formValues} = this.state;

    const params: Partial<TableListParams> = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

  };
}

export default TableList;
