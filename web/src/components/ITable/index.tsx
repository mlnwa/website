import React, { ReactNode } from 'react';
import { SemanticWIDTHS, StrictTableHeaderCellProps, Table } from 'semantic-ui-react';
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
};
interface Props {
  list: any[];
  columns: ColumnType[];
  pagination?: any;
  loading?: boolean;
}
const ITable = function (props: Props) {
  return (
    <Table celled>
      <Table.Header>
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
      <Table.Body>
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
      {/* <Table.Footer  fullWidth>
        <Table.Row>{props.pagination}</Table.Row>
      </Table.Footer> */}
    </Table>
  );
};
export default ITable;
