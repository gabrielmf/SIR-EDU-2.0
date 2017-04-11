import { connect } from 'react-redux'

import StudentFiles from '../components/StudentFiles'
import { uploadFile } from 'store/files'

const mapDispatchToProps = {
    uploadFile
}

const mapStateToProps = (state) => ({
    file: state.file
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentFiles)
