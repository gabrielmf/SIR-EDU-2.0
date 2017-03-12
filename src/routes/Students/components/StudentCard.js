import React from 'react'
import './StudentList.scss'

export default function StudentCard(props) {
    return (
        <tr>
            <td>
                <img src="http://www.iconsfind.com/wp-content/uploads/2015/08/20150831_55e46b0fd325a.png" class="img-thumbnail" alt="Cinque Terre" width="50" height="50"/>
            </td>
            <td>
                <div><a>Jão</a></div>
            </td>
            <td>
                <div>Jão de barro</div>
            </td>
            <td>
                <div>31</div>
            </td>
            <td>
                <div class="action-controls">
                    <span class="edit-student">
                        <i class="fa fa-pencil-square-o fa-lg"
                        aria-hidden="true"></i> Editar
                    </span>
                    <span class="remove-student">
                        <i class="fa fa-user-times fa-lg" 
                        aria-hidden="true"></i> Excluir
                    </span>
                </div>
            </td>
        </tr>
    );
}