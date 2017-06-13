import React from 'react'
import Slider from 'components/Slider'
import TinyMCE from 'react-tinymce'
import Paper from 'material-ui/Paper'
import { browserHistory } from 'react-router'
import { TextField, DatePicker, RaisedButton, FlatButton, MenuItem, Menu, Popover } from 'material-ui';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import './Sight.scss'
import SliderItem from 'components/Slider/SliderItem';
import LoadingSpinner from 'components/LoadingSpinner';
import { Alert } from 'react-bootstrap'

const paperStyle = {
  marginBotton: 300
};

const filesCarousel = (items, actions) => {
    return items.map((item, index) =>(
        <div key={index}>
            <SliderItem item={item} editable={true} actions={actions}/>
        </div>)
    )
}

const searchStudent = (students, id) => {
    let student = students.filter((student) => student._id === id);
    return student.length > 1 ? null : student[0]; 
}

class Sight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            judgement: {
                studentId: this.props.params.id || '',
                title: '',
                date: '',
                text: ''
            },
            student: ''
        };
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleInsertLink = this.handleInsertLink.bind(this);
    }

    componentDidMount() {
        const { getFiles, params, files, students } = this.props;

        if(!files.list.length) {
            getFiles(params.id);
        }
    }

    handleEditorChange = (e) => {
        this.setState({
            judgement: {
                ...this.state.judgement,
                text: e.target.getContent().trim()
            }
        });
    }

    handleChange(key, value) {
        this.setState({
            judgement: {
                ...this.state.judgement,
                [key]: value
            }
        });
    }

    handleCancel() {
        browserHistory.push('/aluno/' + this.props.params.id);
    }

    handleSave = () => {
        this.props.saveJudgement(this.state.judgement);
    }

    handleTouchTap = (event) => {
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    handleInsertLink(url, text) {
        let val = '<a href=' + url +' target="_blank">' + text + '</a>';
        // let val = '<a onclick="window.open("'+ url +'", "_blank");">' + text + '</a>';
        tinymce.activeEditor.execCommand('mceInsertContent', false, val );
    }

    shouldChangeLocation = (judgement) => {
        if (judgement.hasOwnProperty('success') && judgement.success) {
            this.props.clearJudgementState();
            browserHistory.push('/aluno/' + this.props.params.id);
        }
    }

    componentDidUpdate() {
        this.shouldChangeLocation(this.props.judgement);
    }

    render() {
        const { judgement, files, params, students } = this.props;
        let student = searchStudent(students, params.id) || {};
        const studentName = student.name + ' ' + (student.lastName || '');
        const actions = {
            insert: this.handleInsertLink
        };

        return (
            <div class="sight">
                <LoadingSpinner loading={files.isFetching || judgement.isFetching}/>
                <h1 class="text-center page-title">Parecer</h1>
                <div class="row student-info">
                    <div class="col-md-5">
                        <TextField 
                            fullWidth={true} 
                            value={this.state.judgement.title || ''} 
                            floatingLabelText="Título"
                            onChange={(evt, value) => { this.handleChange('title', value) }}
                        />
                    </div>
                    <div class="col-md-3 pull-right">
                        <DatePicker DateTimeFormat={Intl.DateTimeFormat}
                            locale="pt-br"
                            onChange={(evt, value)=>{this.handleChange('date', value.toISOString())}}
                            floatingLabelText="Data"
                        />
                    </div>
                </div>
                <div class="row text-area">
                    <Paper style={paperStyle} zDepth={5}>
                        <TinyMCE
                            content={this.state.judgement.text}
                            config={{
                                plugins: 'link paste autoresize',
                                toolbar: 'undo redo | bold italic | link | alignleft aligncenter alignright',
                                autoresize_max_height: 1000,
                                statusbar: false
                            }}
                            onChange={this.handleEditorChange}
                        />
                    </Paper>
                </div>
                <div class="row slider">
                    {
                        files.list.length > 0 ?
                        <Slider>
                            {filesCarousel(files.list, actions)}
                        </Slider> :
                        <Alert bsStyle="warning">
                            <strong>Aviso:</strong> Nenhum arquivo cadastrado
                        </Alert>
                    }
                </div>
                <div class="row actions pull-right">
                    <RaisedButton class="btn-actions" label="Cancelar" onClick={this.handleCancel}/>
                    <RaisedButton label="Salvar" primary={true} onClick={this.handleSave} />
                </div>
            </div>
        );
    }
}

export default Sight;