import React from 'react'
import { Link } from 'react-router'
import './Header.scss'
import logo from './assets/sir-edu_logo.png'

export const Header = () => (
  <header>
    <nav className='navbar navbar-default'>
      <div className='container-fluid'>
        <div className='navbar-header'>
          <a className='navbar-brand' href='#'><img id='header-logo' src={logo} /></a>
        </div>
        <div className='navbar-inner'>
          <ul className='nav navbar-nav'>
            <li className='active'><a href='index.html'>Home</a></li>
            <li><a href='about.html'>About</a></li>
            <li><a href='services.html'>Services</a></li>
            <li><a href='pricing.html'>Pricing</a></li>
            <li><a href='contact.html'>Contact</a></li>
          </ul>
          <ul className='nav navbar-nav navbar-right'>
            <li><Link to='/cadastrar'><span className='glyphicon glyphicon-user' /> Cadastrar</Link></li>
            <li><Link to='/login'><span className='glyphicon glyphicon-log-in' /> Entrar</Link></li>
          </ul>
        </div></div>
    </nav>
  </header>
)

export default Header
