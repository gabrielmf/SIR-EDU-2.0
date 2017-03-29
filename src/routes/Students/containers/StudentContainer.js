import { connect } from 'react-redux'

import StudentsList from '../components/StudentsList'
import { getStudentsList } from 'store/students'

const mapDispatchToProps = {
    getStudentsList
}

const mapStateToProps = (state) => ({
    students: state.students
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentsList)
