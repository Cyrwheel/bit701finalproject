import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Axios from "axios";

function BoardDetailPage(props) {

    const [dto,setDto]=useState({});
    const {num,currentPage}=useParams();

    const navi=useNavigate();
    const photoUrl=process.env.REACT_APP_BOARDURL;
    const myid=sessionStorage.myid;
    const loginok=sessionStorage.loginok;

    // const selectData=()=>{
    //     const url=`/board/detail?num=${num}`;
    //     Axios.get(url)
    //         .then(res=>{
    //             setDto(res.data);
    //         })
    // }
    // useEffect(()=>{
    //     selectData();
    // },[]);

    const selectData=useCallback(()=>{
        const url=`/board/detail?num=${num}`;
        Axios.get(url)
            .then(res=>{
                setDto(res.data);
            })
    },[num])

    useEffect(()=>{
        selectData();
    },[selectData]);



    return (
        <div style={{marginLeft:'30px', width:'600px'}}>
            <h5><b>{dto.subject}</b></h5>
            <h5>
                <span>작성자 : {dto.myname}({dto.myid && dto.myid.substring(0,3)}****)</span>
                <span style={{float:'right',color:'gray'}}>
                    조회수 : &nbsp;
                    {dto.readcount} <br/>
                    날짜아 : {dto.writeday}
                </span>
            </h5>
            {
                dto.photo==null?'':
                    <img alt={''} src={`${photoUrl}${dto.photo}`}
                    style={{border:'1px solid gray', maxWidth:'500px'}}/>
            }
            <br/>
            <pre>{dto.conent}</pre>
            <br/>
            <div>
                <button type={"button"} style={{width:'80px',marginRight:'6px'}} className={'btn btn-outline-primary'}
                onClick={()=>navi("/board/form")}>글쓰기</button>
                &nbsp;&nbsp;

                <button type={"button"} style={{width:'80px',marginRight:'6px'}} className={'btn btn-outline-primary'}
                onClick={()=>navi(`/board/list/${currentPage}`)}>목록</button>
                &nbsp;&nbsp;

                {
                    loginok!=null && myid===dto.myid?
                        <button type={"button"} style={{width:'80px',marginRight:'6px'}} className={'btn btn-outline-danger'}
                                onClick={()=>{
                                    const url=`/board/delete?num=${dto.num}`;
                                    Axios.delete(url)
                                        .then(res=>{
                                            const b=window.confirm("삭제하시겠습니까?");
                                            if(b)
                                                alert("삭제되었습니다.")
                                            navi(`/board/list/${currentPage}`);

                                        })
                                }}>삭제</button>:''
                }
                &nbsp;&nbsp;
                {
                    loginok!=null && myid===dto.myid?
                        <button type={"button"} style={{width:'80px',marginRight:'6px'}} className={'btn btn-outline-danger'}
                                onClick={()=>{

                                }}>수정</button>:''
                }
            </div>
        </div>
    );
}

export default BoardDetailPage;