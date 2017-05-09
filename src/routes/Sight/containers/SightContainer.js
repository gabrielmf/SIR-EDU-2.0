import { connect } from 'react-redux'
import SightComponent from '../components/Sight'
import { saveJudgement } from 'store/judgement'
import { getFiles } from 'store/files'

const mapDispatchToProps = {
    saveJudgement,
    getFiles
}

const mapStateToProps = (state) => ({
    students: state.students.list
})

export default connect(mapStateToProps, mapDispatchToProps)(SightComponent)