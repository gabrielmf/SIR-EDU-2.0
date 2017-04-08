import { connect } from 'react-redux'

import StudentFiles from '../components/StudentFiles'
import { getStudentsList, filterStudents } from 'store/students'

const mapDispatchToProps = {
    getStudentsList
}

const mapStateToProps = (state) => ({
    students: state.students
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentFiles)
