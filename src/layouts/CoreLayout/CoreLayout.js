import React from 'react'
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner'

export const CoreLayout = ({ children }) => (
  <div>
    <Header />
    <div className='container'>
      <div className='core-layout__viewport'>
        {/*<LoadingSpinner/>*/}
        {children}
      </div>
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
