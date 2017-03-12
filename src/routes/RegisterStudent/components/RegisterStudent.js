import React from 'react'
import Dropzone from 'components/Dropzone'
import './RegisterStudent.scss'

export default class RegisterStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
        this.onImageDrop = this.onImageDrop.bind(this);
    }

    onImageDrop(files) {
        console.log('Arquivo enviado com sucesso');
        this.setState({ file: files[0] });
    }

    render() {
        return (
            <div class="container register-student">
                <div class="row">
                    <h1>Cadastro de Aluno</h1>
                    <form name="registerStudent">
                        <div class="col-md-8">
                            <strong>Inserir imagem:</strong>
                            <span>
                                <Dropzone
                                    multiple={false}
                                    accept={"image/*"}
                                    onDrop={this.onImageDrop}
                                    text={"Arraste e solte uma imagem ou clique no botão para selecionar um arquivo"}>
                                </Dropzone>
                            </span>
                            {this.state.file ?
                            <div class="col-md-4 pull-right">
                                <img src={this.state.file.preview} height="100"/>
                            </div> : null}
                            <h5>Matrícula:</h5><span><input type="number" class="form-control"/></span>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}