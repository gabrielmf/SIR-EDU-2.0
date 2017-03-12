import React from 'react'
import Student from './StudentCard'
import './StudentList.scss'

export default class StudentList extends React.Component {
    constructor(props) {
		super(props);
		this.searchStudent = this.searchStudent.bind(this);
	}
	
	searchStudent(e) {
		e.preventDefault();
		console.log(this.textInput.value);
	}
	
	render() {
		// const studentList = this.props.students.map((student) => {
		// 	return (
		// 		<Student key={student.id} student={student}/>
		// 	);
		// })
		const { searchStudent } = this;

        return (
		<div class="container student-list">
			<div class="row">
				<div class="col-md-12">
					<div class="search-student">
						<form onSubmit={searchStudent}>
							<div class="input-group">
								<input type="text"  ref={(input) => { this.textInput = input; }} class="form-control input-lg" placeholder="Procurar aluno"/>
								<div class="input-group-btn">
									<button class="btn btn-primary input-lg" type="submit">
										Pesquisar <i class="glyphicon glyphicon-search"></i>
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
				<table class="table student-table">
				    <thead>
				      <tr>
						<th/>
				        <th>Nome</th>
				        <th>Escola</th>
				        <th>Turma</th>
						<th>Ações</th>
				      </tr>
				    </thead>
				    <tbody>
				     	<Student/>
				    </tbody>
			    </table>
		    </div>
        </div>
		);
	}
}