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
            <nav class="navbar navbar-default student-header">
                <div>
                    <div class="col-md-2">
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
                        <TextField floatingLabelText="Escola:" value={student.school || ''} underlineShow={false} />
                        <Divider />
                    </div>
                    <div class="col-md-1">
                        <TextField floatingLabelText="Turma:" value={student.classNumber || ''} underlineShow={false} />
                        <Divider />
                    </div>                             
                </div>
            </nav>
        );
    }
}

export default StudentHeader;