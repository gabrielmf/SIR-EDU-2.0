import React from 'react'
import { Link } from 'react-router'
import './Header.scss'
import logo from './assets/sir-edu_logo.png'
import { connect } from 'react-redux'
import { logout } from 'store/login'

export const Header = (props) => (
  <header>
    <nav className='navbar navbar-default'>
      <div className='container-fluid'>
        <div className='navbar-header'>
          <div className='navbar-brand'>
            <Link to="/"><img id='header-logo' src={logo}/></Link>
          </div>
        </div>
        <div className='navbar-inner'>
          <ul className='nav navbar-nav'>
            <li><Link to="/">Página inicial</Link></li>
            {
              !props.auth.isAuthenticated ? 
              [ <li><a>Quem somos</a></li>,
                <li><a>Serviços</a></li>,
                <li><a>Contato</a></li>] :
              [
                <li><Link to='/alunos'>Alunos</Link></li>,
                <li><Link to='/cadastro-aluno'>Cadastrar aluno</Link></li>
              ]
            }
          </ul>
          <ul className='nav navbar-nav navbar-right'>
            {
              !props.auth.isAuthenticated ?
              <li><Link to='/login'><span className='glyphicon glyphicon-log-in' /> Entrar</Link></li> :
              [
                <li><a><span className='glyphicon glyphicon-user'/> Bem-vindo, {props.auth.user.name}</a></li>,
                <li>
                  <a onClick={() => { props.logout(); }}>
                    <span className='glyphicon glyphicon-log-out' /> Sair
                  </a>
                </li>
              ]
            }
          </ul>
        </div></div>
    </nav>
  </header>
)

const mapDispatchToProps = {
    logout
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
