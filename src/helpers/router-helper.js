import { browserHistory } from 'react-router';

export default class RouterHelper {
    static goToStudentsPage() {
        browserHistory.push('/students');
    }
}