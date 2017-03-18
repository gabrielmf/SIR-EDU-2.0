import { connect } from 'react-redux'
import { saveStudent } from 'store/students'
import RegisterStudent from '../components/RegisterStudent'

const mapDispatchToProps = {
    saveStudent
}

const mapStateToProps = (state) => ({
    students: state.students
})

export default connect(mapStateToProps,mapDispatchToProps)(RegisterStudent)
