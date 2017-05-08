import { connect } from 'react-redux'
import SightComponent from '../components/Sight'
import { saveJudgement } from 'store/judgement'

const mapDispatchToProps = {
    saveJudgement
}

const mapStateToProps = (state) => ({
    students: state.students.list
})

export default connect(mapStateToProps, mapDispatchToProps)(SightComponent)