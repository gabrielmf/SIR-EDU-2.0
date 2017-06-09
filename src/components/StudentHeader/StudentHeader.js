import React from 'react'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import defaultAvatar from 'public/default-avatar.png'
import './StudentHeader.scss'

class StudentHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { student } = this.props;

        return (
            <nav class="container-fluid navbar navbar-default student-header">
                <div class="col-md-1">
                    {
                    student.avatar ?
                    <img class="thumbnail avatar" src={'/' + student.avatar.path}/> :
                    <img class="thumbnail avatar" src={defaultAvatar}/>
                    }
                </div>
                <div class="col-md-4">
                    <TextField floatingLabelText="Nome:" value={student.name} underlineShow={false} />
                    <Divider />
                </div>
                <div class="col-md-4">
                    <TextField floatingLabelText="Escola:" value={student.school || ' '} underlineShow={false} />
                    <Divider />
                </div>
                <div class="col-md-1">
                    <TextField floatingLabelText="Turma:" value={student.classNumber || ' '} underlineShow={false} />
                    <Divider />
                </div>
                <div class="col-md-2">
                    <TextField floatingLabelText="Matrícula:" value={student.registration || ' '} underlineShow={false} />
                    <Divider />
                </div>                             
            </nav>
        );
    }
}

export default StudentHeader;