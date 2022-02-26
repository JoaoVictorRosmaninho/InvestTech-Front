import React from 'react'
import BTable from 'react-bootstrap/Table';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce} from 'react-table';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function GlobalFilter({filter, setFilter}) {
  return (
      <input value={filter || ''} onChange={e => setFilter(e.target.value)}
        placeholder="Pesquisar"/>  
  )
}

function Table({ columns, data }) {
  const { getTableProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = useTable({
    columns,
    data,
  }, useGlobalFilter); 

  const { globalFilter } = state;

  return (
  <Container fluid="sm">
    <Row className="mt-4">
    <GlobalFilter filter={globalFilter}  setFilter={setGlobalFilter} />
    <BTable striped bordered hover  className="mt-1" size="sm" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} Style="text-align:center;">
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                if (cell.column.Header == "Ações")
                  return (
                  <td {...cell.getCellProps()} Style="display:flex;justify-content:space-evenly;">
                    <Button variant="primary">Editar</Button>
                    <Button variant="danger">Apagar</Button>
                  </td>
                );
                return (
                  <td {...cell.getCellProps()} Style="text-align:center">
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </BTable>
    </Row>
  </Container>
  )
}

export default Table;
