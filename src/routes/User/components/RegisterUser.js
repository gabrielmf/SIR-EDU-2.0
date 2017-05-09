import React from 'react'
import { TextField, RaisedButton } from 'material-ui'
import './RegisterUser.scss'

class RegisterUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastName: '',
            email: '',
            password: '',
            address: '',
            phone: '',
            idRegistration: '',
            school: ''
        }
    }

    handleChange(key, value) {
        this.setState({ [key]: value });
    }

    render() {
        return (
            <div class="register-user">
                <h1 class="text-center">Cadastro de Usuário</h1>
                <div class="row">
                    <div class="col-md-12">
                        <TextField fullWidth={true} value={this.state.name || ''} type="text" floatingLabelText="Nome"
                            onChange={(evt, val) => { this.handleChange('name', val) }}>
                        </TextField>
                        <TextField fullWidth={true} value={this.state.lastName || ''} type="text" floatingLabelText="Sobrenome"
                            onChange={(evt, val) => { this.handleChange('lastName', val) }}>
                        </TextField>
                        <TextField fullWidth={true} value={this.state.email || ''} type="email" floatingLabelText="E-mail"
                            onChange={(evt, val) => { this.handleChange('email', val) }}>
                        </TextField>
                        <TextField fullWidth={true} value={this.state.password || ''} type="password" floatingLabelText="Senha"
                            onChange={(evt, val) => { this.handleChange('password', val) }}>
                        </TextField>
                        <TextField fullWidth={true} value={this.state.phone || ''} type="number" floatingLabelText="Telefone"
                            onChange={(evt, val) => { this.handleChange('phone', val) }}>
                        </TextField>
                        <TextField fullWidth={true} value={this.state.address || ''} type="text" floatingLabelText="Endereço"
                            onChange={(evt, val) => { this.handleChange('address', val) }}>
                        </TextField>                                                              
                    </div>
                    <div class="col-md-12 buttons">
                        <RaisedButton class="btn-action" label="Cancelar"/> 
                        <RaisedButton class="btn-action" label="Cadastrar" primary={true}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterUser;