import React from 'react'
import { TextField, SelectField, MenuItem, DatePicker, Checkbox } from 'material-ui';
import Dropzone from 'components/Dropzone'

const dropzoneStyle = {
    maxWidth: '50%',
    border:'width: 2px',
    borderColor: 'rgb(102, 102, 102)',
    borderStyle: 'dashed',
    borderRadius: '5px'
}

{/*<Dropzone
    style={dropzoneStyle}
    multiple={false}
    accept={"image/*"}
    onDrop={this.onImageDrop}
    text={"Arraste e solte uma imagem ou clique no botão para selecionar um arquivo"}>
</Dropzone>*/}

const specialNeeds = [{name: 'Altas Habilidades/Superdotado', id: 'a'},{name: 'b', id: 'b'},{name: 'c', id: 'c'}];

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
        this.onImageDrop = this.onImageDrop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckboxGroup = this.handleCheckboxGroup.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

    onImageDrop(files) {
        console.log('Arquivo enviado com sucesso');
        this.setState({ file: files[0] });
    }

    handleChange(event, id, valueParam) {
        let name = '';
        let value = null;

        if (event) {
            name = event.target.name;
            value = event.target.value;
        } else {
            name = id;
            value = valueParam;
        }
        
        this.setState({ [name]: value });

        console.log(this.state)
    }
    
    handleSelectChange = (event, index, values, stateProp) => {console.log('event', stateProp); this.setState({[stateProp] : values});}

    handleCheckboxGroup(value) {
        let newSelectionArray;

        if(this.state.specialNeeds && this.state.specialNeeds.indexOf(value) > -1) {
            newSelectionArray = this.state.specialNeeds.filter(s => s !== value)
        } else {
            newSelectionArray = [...this.state.specialNeeds || '', value];
        }

        this.setState({ specialNeeds: newSelectionArray });
        console.log(this.state);
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.handleSubmit(this.state);
    }

    handleEditorChange(evt) {
        console.log("it works bitches")
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.props.step === 0 && 
                    <div>
                        <div class="col-md-6">
                            <TextField class="col-md-6" fullWidth={true} value={this.state.name || ''} type="text" name="name" onChange={this.handleChange} floatingLabelText="Nome"/>
                            <TextField class="col-md-6" fullWidth={true} value={this.state.registration || ''} type="number" name="registration" onChange={this.handleChange}  floatingLabelText="Matrícula"/>
                            <TextField class="col-md-6" fullWidth={true} value={this.state.classNumber || ''} type="number" name="classNumber" onChange={this.handleChange} floatingLabelText="Turma"/>
                            <TextField class="col-md-6" fullWidth={true} value={this.state.shift || ''} type="text" name="shift" onChange={this.handleChange} floatingLabelText="Turno"/>
                            <TextField class="col-md-6" fullWidth={true} value={this.state.series || ''} type="text" name="series" onChange={this.handleChange} floatingLabelText="Ano/Série"/>
                            <DatePicker class="col-md-6" fullWidth={true} DateTimeFormat={Intl.DateTimeFormat} locale="pt-br"value={this.state.birthdate || {}} name="birthdate" onChange={(evt, value)=>{this.handleChange(evt, 'birthdate', value)}} floatingLabelText="Data Nascimento"/>
                            <TextField class="col-md-6" fullWidth={true} value={this.state.motherName || ''} type="text" name="motherName" onChange={this.handleChange} floatingLabelText="Nome da Mãe"/>
                        </div>
                        <div class="col-md-6">
                            <TextField class="col-md-6" fullWidth={true} value={this.state.relationship || ''} type="text" name="relationship" onChange={this.handleChange} floatingLabelText="Parentesco"/>
                            <TextField class="col-md-6" fullWidth={true} value={this.state.phoneNumber || ''} type="number" name="phoneNumber" onChange={this.handleChange} floatingLabelText="Telefone"/>
                            <TextField class="col-md-6" fullWidth={true} value={this.state.adress || ''} type="text" name="adress" onChange={this.handleChange} floatingLabelText="Endereço"/>
                            <TextField class="col-md-6" fullWidth={true} value={this.state.cid || ''} type="text" name="cid" onChange={this.handleChange} floatingLabelText="CID"/>
                            <SelectField class="col-md-6" fullWidth={true} name="school" value={this.state.school || ''} onChange={this.handleSelectChange} floatingLabelText="Escola:" floatingLabelFixed={true}>
                                <MenuItem/>
                                <MenuItem value="Escola"/>
                            </SelectField>
                            <TextField class="col-md-6" fullWidth={true} value={this.state.fatherName || ''} type="text" name="fatherName" onChange={this.handleChange} floatingLabelText="Nome da Pai"/>
                            <TextField class="col-md-6" fullWidth={true} value={this.state.responsible || ''} type="text" name="responsible" onChange={this.handleChange} floatingLabelText="Responsável"/>
                        </div>
                    </div>
                }
                {this.props.step === 1 &&
                    <div class="col-md-12">
                        <TextField  fullWidth={true} value={this.state.professorNEE || ''} type="text" name="professorNEE" onChange={this.handleChange} floatingLabelText="Professor NEE"/>
                        <TextField  fullWidth={true} value={this.state.orientation || ''} type="text" name="orientation" onChange={this.handleChange} floatingLabelText="Orientação Educacional"/>
                        <TextField  fullWidth={true} value={this.state.coordination || ''} type="text" name="coordination" onChange={this.handleChange} floatingLabelText="Coordenação Pedagógica"/>
                        <DatePicker fullWidth={true} DateTimeFormat={Intl.DateTimeFormat} locale="pt-br" value={this.state.routingDate || {}} name="routingDate" onChange={(evt, value)=>{this.handleChange(evt, 'routingDate', value)}} floatingLabelText="Data de encaminhamento a AEE/SIR"/>
                        <TextField fullWidth={true} multiLine={true} value={this.state.routingReason || ''} type="text" name="routingReason" onChange={this.handleChange} floatingLabelText="Motivo do encaminhamento"/>
                    </div>
                }
                {this.props.step === 2 &&
                    <div>{
                        specialNeeds.map((sn, index) => {
                            return (
                                <div key={index} class="col-md-6">
                                    <Checkbox
                                        label={sn.name}
                                        style={{fontWeight: ''}}
                                        onCheck={() => {this.handleCheckboxGroup(sn.id)}}
                                    />
                                </div>
                            )})
                        }
                        <TextField  fullWidth={true} value={this.state.otherSpecialNeeds || ''} type="text" name="otherSpecialNeeds" onChange={this.handleChange} floatingLabelText="Outras necessidades especiais"/>
                    </div>
                }
                <div class="col-md-12">
                    <input class="hidden" type="submit"/>
                </div>
            </form>
        );
    }
}