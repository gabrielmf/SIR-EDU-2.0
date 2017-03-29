import React from 'react'
import Slider from 'components/Slider'
import TinyMCE from 'react-tinymce'
import Paper from 'material-ui/Paper'
import { TextField, DatePicker } from 'material-ui';
import './Sight.scss'

const paperStyle = {
  marginBotton: 300
};

class Sight extends React.Component {
    constructor(props) {
        super(props);
        console.log('parecer props', props || 'empty');
    }

    handleEditorChange = (e) => {
        console.log('Content was updated:', e.target.getContent());
    }

    render() {
        return (
            <div class="container sight">
                <h1 class="text-center">Parecer</h1>
                <div class="student-info">
                    <div class="col-md-6">
                        <TextField fullWidth={true} floatingLabelText="Nome do Aluno" value="Joao"/>
                    </div>
                    <div class="col-md-3">
                        <TextField fullWidth={true} floatingLabelText="Turma" value="turma 12"/>
                    </div>
                    <div class="col-md-3">
                        <DatePicker floatingLabelText="Data"/>
                    </div>
                </div>
                <div class="col-md-12">
                    <Paper style={paperStyle} zDepth={5}>
                        <TinyMCE
                            content="<p>This is the initial content of the editor</p>"
                            config={{
                                plugins: 'link image code autoresize',
                                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
                            }}
                            onChange={this.handleEditorChange}
                        />
                    </Paper>
                </div>
                {/*<Slider/>*/}
            </div>
        );
    }
}

export default Sight;