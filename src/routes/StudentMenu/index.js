import StudentMenuContainer from './containers/StudentMenuContainer'
import StudentFiles from '../StudentFiles'
import SightRoute from '../Sight'

export default {
    path: 'aluno/:id',
    component: StudentMenuContainer,
    childRoutes : [StudentFiles, SightRoute]
}