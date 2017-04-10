import React from 'react'
import logo from 'public/sir-edu_logo.png'
import './HomeView.scss'

export const HomeView = () => (
  <div class="sir-home text-center">
    <img
      className='logo'
      src={logo} />
      <h4 class="title">Sistema Integrado de Recursos - Educacional</h4>
  </div>
)

export default HomeView
