import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import { Avatar, TextField } from 'material-ui';
import './StudentList.scss';

export default class StudentListTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filteredStudents: this.props.students.list || []
    };
    if(!this.props.students.list.length) {
      this.props.getStudentsList();
    }
		this.searchStudent = this.searchStudent.bind(this);
	}
	
	searchStudent(e) {
		e.preventDefault();
		console.log(this.textInput.value);
    console.log(this.state.filteredStudents)
	}

  render() {
    return (
      <div class="container student-list">
        <div class="col-md-6 col-md-offset-3">
					<div class="search-student">
						<form onSubmit={this.searchStudent}>
							<div class="input-group">
								<input type="text"  ref={(input) => { this.textInput = input; }} class="form-control input-lg" placeholder="Procurar aluno"/>
								<div class="input-group-btn">
									<button class="btn btn-primary input-lg" type="submit">
										<i class="glyphicon glyphicon-search"></i>
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
        <div class="col-md-10 col-md-offset-1">
          <Table selectable={false}>
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
            {this.props.students.list.map( (student, index) => (
              <TableRow key={index}>
                <TableRowColumn>
                    {student.avatar ? <Avatar src={'' + student.avatar.path} class="pull-left" size={45}/> : null}
                </TableRowColumn>
                <TableRowColumn><a>{student.name}</a></TableRowColumn>
                <TableRowColumn>Escola</TableRowColumn>
                <TableRowColumn>Turma</TableRowColumn>
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
        </Table></div>
        </div>);
    }}