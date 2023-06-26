import React from 'react';
import '../App.css';
import {NavLink, useNavigate} from "react-router-dom";
function Menu(props) {

    const navi=useNavigate();

    const logout=()=>{
        alert("로그아웃이 되었어용");
        sessionStorage.loginok="no";
        sessionStorage.myname="";
        sessionStorage.myid="";

    }

    return (
        <ul className='menu'>
            <li>
                <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
                <NavLink to={"/member/form"}>회원가입</NavLink>
            </li>
            <li>
                <NavLink to={"/member/list/1"}>회원목록</NavLink>
            </li>
            <li>
                <NavLink to={"/board/list"}>게시판</NavLink>
            </li>
            <li style={{width:'300px'}}>
                {
                    sessionStorage.loginok==="yes"?
                        <NavLink to={"/login"} onClick={logout}><b style={{backgroundColor:'palevioletred'}}>로그아웃</b> &nbsp;&nbsp;
                            <span style={{backgroundColor:'powderblue'}}>{sessionStorage.myname}님 로그인 중</span></NavLink>
                        : <NavLink to={"/login"}>로그인</NavLink>
                }
            </li>
        </ul>
    );
}

export default Menu;