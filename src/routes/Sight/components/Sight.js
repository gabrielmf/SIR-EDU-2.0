import React from 'react'
import Slider from 'components/Slider'
import TinyMCE from 'react-tinymce'
import Paper from 'material-ui/Paper'
import { browserHistory } from 'react-router'
import { TextField, DatePicker, RaisedButton } from 'material-ui';
import './Sight.scss'

const paperStyle = {
  marginBotton: 300
};

class Sight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _studentId: this.props.params.id || '',
            date: '',
            text: ''
        };
        this.student = '';
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        console.log(this.props.students);
    }

    handleEditorChange = (e) => {
        this.setState({
            text: e.target.getContent().trim()
        });
    }

    handleChange(key, value) {
        this.setState({
            [key]: value
        });
    }

    handleCancel() {
        browserHistory.push('/aluno/' + this.props.params.id);
    }

    handleSave() {
        this.props.saveJudgement(this.state);
    }

    render() {
        return (
            <div class="container sight">
                <h1 class="text-center">Parecer</h1>
                <div class="student-info">
                    <div class="col-md-6">
                        <TextField fullWidth={true} floatingLabelText="Nome do Aluno"/>
                    </div>
                    <div class="col-md-3">
                        <TextField fullWidth={true} floatingLabelText="Turma"/>
                    </div>
                    <div class="col-md-3">
                        <DatePicker DateTimeFormat={Intl.DateTimeFormat}
                            locale="pt-br"
                            onChange={(evt, value)=>{this.handleChange('date', value)}}
                            floatingLabelText="Data"
                        />
                    </div>
                </div>
                <div class="col-md-12">
                    <Paper style={paperStyle} zDepth={5}>
                        <TinyMCE
                            config={{
                                plugins: 'link paste code autoresize',
                                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
                            }}
                            onChange={this.handleEditorChange}
                        />
                    </Paper>
                </div>
                <div class="col-md-12">
                    <div class="pull-left actions">
                        <RaisedButton class="btn-actions" label="Cancelar" onClick={this.handleCancel}/>
                        <RaisedButton class="btn-actions" label="Salvar" primary={true} onClick={this.handleSave}/>
                    </div>
                </div>
                {/*<Slider items={[1,2,3,4,5]}/>*/}
            </div>
        );
    }
}

export default Sight;