import React from 'react'
import { TextField, RaisedButton, Dialog, FlatButton } from 'material-ui'
import LoadingSpinner from 'components/LoadingSpinner';
import { browserHistory } from 'react-router'
import './RegisterUser.scss'

class RegisterUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user : {
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
    }

    handleChange = (key, value) => {
        this.setState({
           user: { 
               ...this.state.user,
               [key]: value 
            }
        });
    }

    handleCancel = () => {
        browserHistory.push('/login');
    }

    handleSubmit = () => {
        this.props.registerUser(this.state.user);
    }

    render() {
        const { user, login } = this.props;
        
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                onTouchTap={() => {
                    const {email, password} = this.state.user;
                    user.success ? login({email, password}) : browserHistory.push('/login');
                }}
            />
        ];
        return (
            <div class="register-user">
                <LoadingSpinner loading={this.props.user.isFetching}/>
                <Dialog
                    actions={actions}
                    modal={true}
                    open={user.hasOwnProperty('success')}
                >
                    {user.message}
                </Dialog>
                <h1 class="text-center">Cadastro de Usuário</h1>
                <div class="row">
                    <div class="col-md-8 col-md-offset-2">
                        <TextField fullWidth={true} value={this.state.user.name || ''} type="text" floatingLabelText="Nome"
                            onChange={(evt, val) => { this.handleChange('name', val) }}>
                        </TextField>
                        <TextField fullWidth={true} value={this.state.user.lastName || ''} type="text" floatingLabelText="Sobrenome"
                            onChange={(evt, val) => { this.handleChange('lastName', val) }}>
                        </TextField>
                        <TextField fullWidth={true} value={this.state.user.email || ''} type="email" floatingLabelText="E-mail"
                            onChange={(evt, val) => { this.handleChange('email', val) }}>
                        </TextField>
                        <TextField fullWidth={true} value={this.state.user.password || ''} type="password" floatingLabelText="Senha"
                            onChange={(evt, val) => { this.handleChange('password', val) }}>
                        </TextField>
                        <TextField fullWidth={true} value={this.state.user.phone || ''} type="number" floatingLabelText="Telefone"
                            onChange={(evt, val) => { this.handleChange('phone', val) }}>
                        </TextField>
                        <TextField fullWidth={true} value={this.state.user.address || ''} type="text" floatingLabelText="Endereço"
                            onChange={(evt, val) => { this.handleChange('address', val) }}>
                        </TextField>                                                              
                    </div>
                    <div class="col-md-8 buttons col-md-offset-2">
                        <RaisedButton class="btn-action" label="Cancelar" onClick={this.handleCancel}/> 
                        <RaisedButton class="btn-action" label="Cadastrar" primary={true} onClick={this.handleSubmit}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterUser;