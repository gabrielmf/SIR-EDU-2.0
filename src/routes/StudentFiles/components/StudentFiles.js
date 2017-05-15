import React from 'react'
import Dropzone from 'components/Dropzone'
import { DatePicker, TextField, RaisedButton } from 'material-ui'
import { browserHistory } from 'react-router'
import './StudentFiles.scss'

class StudentFiles extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
            date: '',
            comment: '',
            _studentId: this.props.params.id || ''
        };

        this.onDropFile = this.onDropFile.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    onDropFile(key, file) {
        this.setState({ [key]: file });
    }

    handleChange(key, val) {
        this.setState({ [key]: val });
    }

    handleCancel() {
        browserHistory.push('/aluno/' + this.props.params.id);
    }

    handleSave() {
        this.props.uploadFile(this.state);
    }
    
    render() {
        return (
            <div class="row student-files">
                <h1 class="col-md-12 text-center">Cadastrar Fotos ou Vídeos</h1>
                <div class="col-md-12 text-center">
                    <Dropzone
                        multiple={false}
                        accept={'video/mp4,video/x-m4v,video/*,image/*'}
                        name="file"
                        onDrop={this.onDropFile}
                        initConfig={this.state.file}
                        text={"Arraste e solte uma imagem/vídeo ou clique no botão para selecionar um arquivo"}>
                    </Dropzone>
                </div>
                <div class="col-md-3">
                    <DatePicker 
                        fullWidth={true} 
                        DateTimeFormat={Intl.DateTimeFormat} 
                        locale="pt-br"
                        floatingLabelFixed={true}
                        floatingLabelText="Data:"
                        onChange={(evt, val) => {this.handleChange('date', val)}}
                        placeholder="dd/mm/aaaa"
                    />
                </div>
                <div class="col-md-12">
                    <TextField
                        floatingLabelText="Comentário sobre a foto/vídeo:"
                        multiLine={true}
                        fullWidth={true}
                        onChange={(evt, val) => {this.handleChange('comment', val)}}
                    />
                </div>
                <div class="col-md-12">
                    <div class="pull-left actions">
                        <RaisedButton class="btn-actions" label="Cancelar" onClick={this.handleCancel}/>
                        <RaisedButton class="btn-actions" 
                            label="Salvar"
                            primary={true}
                            disabled={this.state.file === null}
                            onClick={this.handleSave}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default StudentFiles;