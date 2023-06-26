import React, {useEffect, useState} from 'react';
import '../App.css';
import Axios from "axios";
import MemberRowList from "./MemberRowList";

function MemberList(props) {

    const [mlist,setMlist]=useState([]);
    //목록 가져오는 함수
    const getList=()=>{
        const url="/member/list";

        //엑시오스 겟에다가 url을 보내면 res.data가 넘어온다
        Axios.get(url)
            .then(res=>{
                //setmlist에다가  res.data를 보내면된다.
                setMlist(res.data);
            })
    }

    //삭제하는 함수
    const deleteMember=(num)=>{
        const url="/member/delete?num="+num;
        Axios.delete(url)
            .then(res=>{
                //성공을 하면 목록을 다시호출
                getList();
            })
    }

    useEffect(()=>{
        getList();
    },[])


    return (
        <div>
            <h4>총 회원수 : {mlist.length}명 </h4>
            <table className={"table table-bordered"} style={{width:"800px"}}>
                <tr style={{backgroundColor:"#ddd", textAlign:'center'}}>
                    <th style={{width:'20px'}}>번호</th>
                    <th style={{width:'40px'}}>회원명</th>
                    <th style={{width:'60px'}}>아이디</th>
                    <th style={{width:'200px'}}>주소</th>
                    <th style={{width:'100px'}}>가입일</th>
                    <th style={{width:'40px'}}>삭제</th>
                </tr>
                {
                    mlist.map((row,idx)=><MemberRowList key={idx} row={row} onDelete={deleteMember}
                    idx={idx}/>)
                }
            </table>
        </div>
    );
}

export default MemberList;