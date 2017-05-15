import { connect } from 'react-redux'
import RegisterUser from '../components/RegisterUser'
import { registerUser } from 'store/users'
import { login } from 'store/login'

const mapDispatchToProps = {
    registerUser,
    login
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser)