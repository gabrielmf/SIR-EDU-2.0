import { connect } from 'react-redux'
import SightComponent from '../components/Sight'
import { saveJudgement, clearJudgementState } from 'store/judgement'
import { getFiles } from 'store/files'

const mapDispatchToProps = {
    saveJudgement,
    getFiles,
    clearJudgementState
}

const mapStateToProps = (state) => ({
    students: state.students.list,
    files: state.files,
    judgement: state.judgement
})

export default connect(mapStateToProps, mapDispatchToProps)(SightComponent)