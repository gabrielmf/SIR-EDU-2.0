import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import { Avatar, TextField } from 'material-ui';
import './StudentList.scss';

const tableData = [
  {
    name: 'John Smith',
    status: 'Employed',
    selected: true,
  },
  {
    name: 'Randal White',
    status: 'Unemployed',
  },
  {
    name: 'Stephanie Sanders',
    status: 'Employed',
    selected: true,
  },
  {
    name: 'Steve Brown',
    status: 'Employed',
  },
  {
    name: 'Joyce Whitten',
    status: 'Employed',
  },
  {
    name: 'Samuel Roberts',
    status: 'Employed',
  },
  {
    name: 'Adam Moore',
    status: 'Employed',
  },
    {
    name: 'Steve Brown',
    status: 'Employed',
  },
  {
    name: 'Joyce Whitten',
    status: 'Employed',
  },
  {
    name: 'Samuel Roberts',
    status: 'Employed',
  },
  {
    name: 'Adam Moore',
    status: 'Employed',
  },
    {
    name: 'Steve Brown',
    status: 'Employed',
  },
  {
    name: 'Joyce Whitten',
    status: 'Employed',
  },
  {
    name: 'Samuel Roberts',
    status: 'Employed',
  },
  {
    name: 'Adam Moore',
    status: 'Employed',
  }
];

export default class StudentListTable extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="container">
        <Table
          selectable={false}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn colSpan="5" style={{textAlign: 'center'}}>
                <h1>Alunos</h1>
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>Foto</TableHeaderColumn>
              <TableHeaderColumn>Nome</TableHeaderColumn>
              <TableHeaderColumn>Escola</TableHeaderColumn>
              <TableHeaderColumn>Turma</TableHeaderColumn>
              <TableHeaderColumn>Ações</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            showRowHover={true}
            displayRowCheckbox={false}
            deselectOnClickaway={true}
          >
            {tableData.map( (row, index) => (
              <TableRow key={index} selected={row.selected}>
                <TableRowColumn>
                    <Avatar class="pull-left" size={45}/>
                </TableRowColumn>
                <TableRowColumn><a>{row.name}</a></TableRowColumn>
                <TableRowColumn>{row.status}</TableRowColumn>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>
                    <span class="edit-student">
                        <i class="fa fa-pencil-square-o fa-lg"
                        aria-hidden="true"></i> Editar
                    </span>
                    <span class="remove-student">
                        <i class="fa fa-user-times fa-lg" 
                        aria-hidden="true"></i> Excluir
                    </span></TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
        </div>);
    }}