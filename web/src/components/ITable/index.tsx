import React, { ReactNode, useEffect, useState } from 'react';
import {
  Dimmer,
  DropdownItemProps,
  DropdownProps,
  Input,
  Loader,
  Pagination,
  PaginationProps,
  Select,
  SemanticWIDTHS,
  StrictTableHeaderCellProps,
  Table,
} from 'semantic-ui-react';
import style from './sytle.module.scss';
import { IDebounce } from '../../utils';
import { Constants } from '../../assets/ts/Constants';
export type ColumnType = {
  title: ReactNode;
  onClick?: any;
  key?: string;
  width?: SemanticWIDTHS;
  sorted?: StrictTableHeaderCellProps['sorted'];
  sortable?: boolean;
  sorter?: (a: any, b: any) => number;
  render?: (row: any, index: number) => React.ReactNode;
  renderHeader?: (column: any) => React.ReactNode;
  pageIndex?: number;
};
interface Props {
  list: any[];
  columns: ColumnType[];
  pagination?: any;
  loading?: boolean;
  children?: React.ReactNode | React.ReactNode[];
  total?: number;
  onPageIndexChange?: (pageIndex: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageIndex?: number;
}
const pageOptions: DropdownItemProps[] = Constants.PAGE_SIZE_OPTIONS.map((item) => {
  return {
    text: `${item}条/页`,
    value: item,
  };
});
let pageSize = Constants.PAGE_SIZE;
let debounceOnPageIndexChange = (_: number) => {};
const ITable = function ({ children, ...props }: Props) {
  const [activePage, setActivePage] = useState(1);
  const [toPageIndex, setToPageIndex] = useState(1);
  useEffect(() => {
    pageSize = Constants.PAGE_SIZE;
    debounceOnPageIndexChange = IDebounce(pageIndexChange, 200);
  }, []);
  useEffect(() => {
    setToPageIndex(activePage);
  }, [activePage]);
  const needFooter = props.total !== undefined;
  let totalPages = 0;
  if (needFooter) {
    totalPages = Math.max(Math.ceil(props.total / pageSize), 1);
  }
  const pageIndexChange = (pageIndex: number) => {
    if (!props.onPageIndexChange) return;
    props.onPageIndexChange(pageIndex);
  };
  const pageIndexChangeHandler = (pageIndex: number) => {
    if (pageIndex == activePage) return;
    pageIndex = Math.max(1, Math.min(pageIndex, totalPages));
    setActivePage(pageIndex);
    debounceOnPageIndexChange(pageIndex);
  };
  const pageSizeChangeHandler = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    pageSize = Number(data.value);
    setActivePage(1);
    props.onPageSizeChange(pageSize);
  };
  return (
    <div className={style.table_container}>
      <Dimmer active={props.loading}>
        <Loader />
      </Dimmer>
      <Table celled striped className={`${style.table} ${needFooter ? style.table_has_footer : ''}`}>
        <Table.Header className={style.header}>
          <Table.Row>
            <Table.HeaderCell colSpan={props.columns.length}>{children}</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            {props.columns.map((column, index) => {
              return (
                <Table.HeaderCell
                  key={index}
                  width={column.width}
                  sorted={column.sorted}
                  onClick={column.onClick}
                  sortable={column.sortable}
                >
                  {column.renderHeader ? column.renderHeader(column) : column.title}
                </Table.HeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>

        <Table.Body className={style.body}>
          {props.list.map((item, index) => {
            return (
              <Table.Row key={index}>
                {props.columns.map((column, idx) => {
                  return (
                    <Table.Cell key={idx} width={column.width}>
                      {column.render ? column.render(item, index) : item[column.key]}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            );
          })}
          {props.list.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={props.columns.length} textAlign="center">
                暂无数据
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
        {needFooter && (
          <Table.Footer className={style.footer}>
            <Table.Row>
              <Table.HeaderCell colSpan={props.columns.length}>
                <div className={style.pagination}>
                  共{props.total}条
                  <Pagination
                    activePage={Math.min(activePage, totalPages)}
                    totalPages={totalPages}
                    onPageChange={(e, props) => {
                      pageIndexChangeHandler(Number(props.activePage));
                    }}
                  ></Pagination>
                  {props.onPageSizeChange && (
                    <Select
                      options={pageOptions}
                      defaultValue={Constants.PAGE_SIZE}
                      onChange={pageSizeChangeHandler}
                    ></Select>
                  )}
                  跳至
                  <Input
                    value={Math.min(toPageIndex, totalPages)}
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(/[^\d]/g, '');
                      setToPageIndex(Number(e.target.value));
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => {
                      pageIndexChangeHandler(Number(e.target.value));
                    }}
                    style={{ width: '60px' }}
                  ></Input>
                  页
                </div>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        )}
      </Table>
    </div>
  );
};
export default ITable;
