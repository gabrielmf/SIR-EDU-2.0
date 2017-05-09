import { connect } from 'react-redux'

import StudentMenu from '../components/StudentMenu'
import { getFiles } from 'store/files'

const mapDispatchToProps = {
    getFiles
}

const mapStateToProps = (state) => ({
    students: state.students,
    files: state.files
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentMenu)
