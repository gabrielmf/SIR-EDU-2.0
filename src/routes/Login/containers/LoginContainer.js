import { connect } from 'react-redux'
import { login } from 'store/login'

import LoginView from '../components/LoginView'

const mapDispatchToProps = {
    login
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)