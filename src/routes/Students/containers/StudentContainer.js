import { connect } from 'react-redux'

import StudentListTable from '../components/StudentListTable'
import { getStudentsList, filterStudents, setSelectedStudent } from 'store/students'

const mapDispatchToProps = {
    getStudentsList,
    filterStudents,
    setSelectedStudent
}

const mapStateToProps = (state) => ({
    students: state.students,
    filterText: state.students.filterText
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentListTable)
