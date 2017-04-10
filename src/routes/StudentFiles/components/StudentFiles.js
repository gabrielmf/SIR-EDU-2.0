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
            comment: ''
        }
        this.onDropFile = this.onDropFile.bind(this);
    }

    onDropFile(file) {
        this.setState({ file: file[0] });
    }

    handleCancel() {
        console.log('back')
    }

    handleSave() {
        console.log('save')
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
                        placeholder="dd/mm/aaaa"
                    />
                </div>
                <div class="col-md-12">
                    <TextField
                        floatingLabelText="Comentário sobre a foto/vídeo:"
                        multiLine={true}
                        fullWidth={true}
                    />
                </div>
                <div class="col-md-12">
                    <div class="pull-right actions">
                        <RaisedButton class="btn-actions" label="Cancelar" onClick={this.handleCancel}/>
                        <RaisedButton class="btn-actions" label="Salvar" primary={true} onClick={this.handleSave}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default StudentFiles;