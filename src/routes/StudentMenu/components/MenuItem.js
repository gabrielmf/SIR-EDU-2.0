import React from 'react'
import { Link } from 'react-router'
import './StudentMenu.scss'
console.log(this);
export const MenuItem = (props) => (
    <div class="row menu-items">
        <div class="col-md-2">
            <div class="menu-item">
                <Link to={props.location.pathname + '/arquivos'}>
                    <div class="icons-box">
                        <i class="fa fa-camera fa-3x" aria-hidden="true"></i>
                    </div>
                    <h4>Fotos/Vídeos</h4>
                </Link>
            </div>
        </div>
        <div class="col-md-2">
            <div class="menu-item">
                <Link to={props.location.pathname + '/parecer'}>
                    <div class="icons-box">
                        <i class="fa fa-pencil-square-o fa-3x" aria-hidden="true"></i>
                    </div>
                    <h4>Parecer</h4>
                </Link>
            </div>
        </div>
        <div class="col-md-2">
            <div class="menu-item">
                <div class="icons-box">
                    <i class="fa fa-id-card-o fa-3x" aria-hidden="true"></i>
                </div>
                <h4>Atendimento</h4>
            </div>
        </div>
        <div class="col-md-2">
            <div class="menu-item">
                <div class="icons-box">
                    <i class="fa fa-file-text-o fa-3x" aria-hidden="true"></i>
                </div>
                <h4>Adequação Curricular</h4>
            </div>
        </div>
        <div class="col-md-2">
            <div class="menu-item">
                <div class="icons-box">
                    <i class="glyphicon glyphicon-list-alt fa-3x" aria-hidden="true"></i>
                </div>
                <h4>P.D.I</h4>
            </div>
        </div>
        <div class="col-md-2">
            <div class="menu-item">
                <div class="icons-box">
                    <i class="fa fa-user fa-3x" aria-hidden="true"></i>
                </div>
                <h4>Aluno</h4>
            </div>
        </div>
    </div>
);

export default MenuItem;