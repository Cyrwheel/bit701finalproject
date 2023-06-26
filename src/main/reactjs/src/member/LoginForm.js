import React, {useState} from 'react';
import '../App.css';
import {useNavigate} from "react-router-dom";
import Axios from "axios";

function LoginForm(props) {

    const [myid,setMyid]=useState('');
    const [mypass,setMypass]=useState('');

    const navi=useNavigate();


    const onSubmitLogin=(e)=>{
        e.preventDefault(); //기본 이벤트 무효화'

        const url=`/member/login?myid=${myid}&mypass=${mypass}`;
        Axios.get(url)
            .then(res=>{
                if(res.data.success==='yes'){
                    // 로컬스토리지 : 직접 지우기 전에는 브라우저에 남아있다.
                    // 세션스토리지 :  껏다 키면 브라우저에서 사라진다.
                    sessionStorage.loginok="yes";
                    sessionStorage.myname=res.data.myname;
                    sessionStorage.myid=myid;
                    navi("/")
                    window.location.reload();
                }else {
                    alert("아이디나 비밀번호가 맞지 않습니다.");
                    sessionStorage.loginok="no";
                    sessionStorage.myname="";
                    sessionStorage.myid="";

                }
            })
    }

    return (
        <div className={'login'}>
            <form onSubmit={onSubmitLogin}>
                <table className={"table table-bordered"}>
                    <tbody>

                    <tr>
                        <th style={{width:'100px',backgroundColor:'#b0e0e6'}}>아이디</th>
                        <td>
                            <input type={"text"} className={"form-control"}
                                   placeholder={"아이디"} required
                                   value={myid} onChange={(e)=>{
                                setMyid(e.target.value)
                            }}/>
                        </td>
                    </tr>

                    <tr>
                        <th style={{width:'100px',backgroundColor:'#b0e0e6'}}>비밀번호</th>
                        <td>
                            <input type={"password"} className={"form-control"}
                                   required
                                   value={mypass} onChange={(e)=>setMypass(e.target.value)}/>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2} align={'center'}>
                            <button type={"submit"} className={"btn btn-outline-primary"} style={{width:'100px'}}>
                                로그인
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>

        </div>
    );
}

export default LoginForm;