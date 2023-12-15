import React, { ReactNode, useEffect, useState } from 'react';
import {
  DropdownItemProps,
  DropdownProps,
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
  key: string;
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
let cachePageIndex = 1;
let debounceOnPageIndexChange = (_: PaginationProps) => {};
const ITable = function ({ children, ...props }: Props) {
  const [pageIndex, setPageIndex] = useState(cachePageIndex);
  useEffect(() => {
    // setPageIndex(props.pageIndex);
    pageSize = Constants.PAGE_SIZE;
    debounceOnPageIndexChange = IDebounce(pageChange, 200);
  }, []);
  const needFooter = props.total !== undefined;
  let totalPages = 0;
  if (needFooter) {
    totalPages = Math.ceil(props.total / pageSize);
  }
  const pageChange = (pageProps: PaginationProps) => {
    if (!props.onPageIndexChange) return;
    props.onPageIndexChange(Number(pageProps.activePage));
  };
  const pageSizeChange = (data: DropdownProps) => {
    pageSize = Number(data.value);
    setPageIndex(1);
    if (!props.onPageSizeChange) return;
    props.onPageSizeChange(pageSize);
  };
  return (
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
              {props.columns.map((column, index) => {
                return (
                  <Table.Cell key={index} width={column.width}>
                    {column.render ? column.render(item, index) : item[column.key]}
                  </Table.Cell>
                );
              })}
            </Table.Row>
          );
        })}
      </Table.Body>
      {needFooter && (
        <Table.Footer className={style.footer}>
          <Table.Row>
            <Table.HeaderCell colSpan={props.columns.length}>
              共{props.total}条
              <Pagination
                activePage={pageIndex}
                totalPages={totalPages}
                onPageChange={(e, props) => {
                  setPageIndex(Number(props.activePage));
                  debounceOnPageIndexChange(props);
                }}
              ></Pagination>
              <Select
                options={pageOptions}
                defaultValue={Constants.PAGE_SIZE}
                onChange={(e, data) => {
                  pageSizeChange(data);
                }}
              ></Select>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      )}
    </Table>
  );
};
export default ITable;
