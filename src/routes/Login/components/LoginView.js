import React from 'react';
import './LoginView.scss';

export default class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: ''
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      const target = event.target;
      let newState = {};
      newState[target.type] = target.value;
      this.setState(newState);
    }

    handleSubmit(event) {
      event.preventDefault();
      const email = this.state.email
      const password = this.state.password;
      const creds = { email: email.trim(), password: password.trim() }
      this.props.login(creds);
    } 
    
    render() {
       return (
          <section class="login-container">
            <section class="login-form">
              <form name="loginForm" role="login" onSubmit={this.handleSubmit}>
                <section>
                  <h3>Login</h3>
                  <div class="form-group">
                      <div class="input-group">
                          <div class="input-group-addon"><span class="text-primary glyphicon glyphicon-envelope"></span></div>
                      <input type="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" required class="form-control" />
                    </div>
                  </div>
                  <div class="form-group">
                      <div class="input-group">
                          <div class="input-group-addon"><span class="text-primary glyphicon glyphicon-lock"></span></div>
                      <input type="password" value={this.state.password} onChange={this.handleChange} placeholder="Senha" required class="form-control" />
                    </div>
                  </div>
                  <div class="form-group pull-left">
                    <input type="checkbox" name="remember" value="1" /> Lembrar de mim
                  </div>
                  <button type="submit" name="go" class="btn btn-block btn-success">Entrar</button>
                </section>
                <div>
                  <a href="#">Esqueceu sua senha?</a>
                </div>
              </form>
            </section>
        </section>
      )
     }
}

    Login.propTypes = {
      login : React.PropTypes.func.isRequired,
      auth   : React.PropTypes.object
    }