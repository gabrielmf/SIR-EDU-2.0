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
                _studentId: this.props.params.id || '',
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
        //this.props.saveJudgement(this.state);
        console.log(this.state.judgement)
    }

    handleTouchTap = (event) => {
        // This prevents ghost click.
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
        let val = '<a href=' + url +'>' + text + '</a>';
        tinymce.activeEditor.execCommand('mceInsertContent', false, val );
    }

    render() {
        const { files, params, students } = this.props;
        let student = searchStudent(students, params.id) || {};
        const studentName = student.name + ' ' + (student.lastName || '');
        const actions = {
            insert: this.handleInsertLink
        };

        return (
            <div class="container sight">
                <LoadingSpinner loading={files.isFetching}/>
                <Toolbar className="toolbar-edit">
                    <ToolbarGroup>
                        <ToolbarTitle text="Parecer" />
                        <ToolbarSeparator />
                        <FlatButton
                            onTouchTap={this.handleTouchTap}
                            label="Opções"
                        />
                        <Popover
                            open={this.state.open}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            onRequestClose={this.handleRequestClose}
                        >
                        <Menu>
                            <MenuItem primaryText="Imprimir" />
                            <MenuItem primaryText="Gerar aquivo Word" />
                            <MenuItem primaryText="Gerar aquivo PDF" />
                        </Menu>
                        </Popover>
                    </ToolbarGroup>
                    <ToolbarGroup lastChild={true}>
                        <RaisedButton label="Salvar" primary={true} onTouchTap={this.handleSave} />
                    </ToolbarGroup>
                </Toolbar>
                <h1 class="text-center"></h1>
                <div class="student-info">
                    <div class="col-md-6">
                        <TextField fullWidth={true}
                            floatingLabelText="Nome do Aluno"
                            value={studentName}
                        />
                    </div>
                    <div class="col-md-3">
                        <TextField fullWidth={true} value={student.classNumber || ''} floatingLabelText="Turma"/>
                    </div>
                    <div class="col-md-3">
                        <DatePicker DateTimeFormat={Intl.DateTimeFormat}
                            locale="pt-br"
                            onChange={(evt, value)=>{this.handleChange('date', value)}}
                            floatingLabelText="Data"
                        />
                    </div>
                </div>
                <div class="col-md-12 text-area">
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
                <div class="col-md-12 slider">
                    {files.list && files.list.length && 
                    <Slider>
                        {filesCarousel(files.list, actions)}
                    </Slider>}
                </div>
            </div>
        );
    }
}

export default Sight;