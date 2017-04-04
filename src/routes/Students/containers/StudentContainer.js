import { connect } from 'react-redux'

import StudentListTable from '../components/StudentListTable'
import { getStudentsList } from 'store/students'

const mapDispatchToProps = {
    getStudentsList
}

const mapStateToProps = (state) => ({
    students: state.students
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentListTable)
