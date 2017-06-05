import { connect } from 'react-redux'

import StudentMenu from '../components/StudentMenu'
import { getFiles } from 'store/files'
import { getJudgements } from 'store/judgement'

const mapDispatchToProps = {
    getFiles,
    getJudgements
}

const mapStateToProps = (state) => ({
    students: state.students,
    files: state.files,
    judgements: state.judgements
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentMenu)
