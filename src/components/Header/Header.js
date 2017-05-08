import React from 'react'
import { Link } from 'react-router'
import './Header.scss'
import logo from './assets/sir-edu_logo.png'

export const Header = () => (
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
            <li className='active'><Link to="/">Home</Link></li>
            <li><a>Quem somos</a></li>
            <li><a>Serviços</a></li>
            <li><a>Contato</a></li>
          </ul>
          <ul className='nav navbar-nav navbar-right'>
            <li><Link to='/cadastro-aluno'><span className='glyphicon glyphicon-user' /> Cadastrar aluno</Link></li>
            <li><Link to='/login'><span className='glyphicon glyphicon-log-in' /> Entrar</Link></li>
          </ul>
        </div></div>
    </nav>
  </header>
)

export default Header
