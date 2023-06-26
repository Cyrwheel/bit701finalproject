import React, {useCallback, useEffect, useState} from 'react';
import '../App.css';
import {Link, NavLink, useNavigate, useParams} from "react-router-dom";
import Axios from "axios";
import BoardRowList from "./BoardRowList";
function BoardList(props) {

    //리턴하기전에 네비로이동
    const navi=useNavigate();

    //초기값만 있으면된다. 없으면 에러가 많이난다.
    const [data,setData]=useState('');

    const {currentPage}=useParams();
    console.log({currentPage});

    //페이징처리에 필요한 데이터 가져오기
    // const list=()=>{
    //     const url="/board/list?currentPage="+(currentPage==null?1:currentPage);
    //     Axios.get(url)
    //         .then(res=>{
    //             setData(res.data);
    //         })
    // }
    // useEffect(()=>{
    //     list();
    // },[currentPage]); //currentPage가 변경될때마다 호출

    const list=useCallback(()=>{
        const url="/board/list?currentPage="+(currentPage==null?1:currentPage);
        Axios.get(url)
            .then(res=>{
                setData(res.data);
            })
    },[currentPage]);

    useEffect(()=>{
        list();
    },[list])


    const onWriteButtonEvent=()=>{
        if(sessionStorage.loginok==null){
            alert("먼저 로그인해주세여");
            navi("/login");
        }else {
            navi("/board/form");
        }
    }
    //console.log({currentPage});

    return (
        <div>
            <button type={"button"} className={"btn btn-outline-primary"}
                    style={{width:"170px",marginLeft:'100px'}}
                    onClick={onWriteButtonEvent}>글쓰기</button>
            <br/><br/><br/><br/>
            <h2>게시판 목록</h2>
            {
                data.totalCount &&
                <h4><b>총 {data.totalCount}개의 글이 있습니다.</b></h4>
            }

            <table className={"table table-bordered"} style={{width:'700px'}}>
                <thead>
                <tr style={{backgroundColor:"#eeddff"}}>
                    <th style={{width:'30px'}}>번호</th>
                    <th style={{width:'200px'}}>제목</th>
                    <th style={{width:'70px'}}>작성자</th>
                    <th style={{width:'100px'}}>작성일</th>
                    <th style={{width:'50px'}}>조회</th>
                </tr>
                </thead>
                <tbody>
                {
                    //비 동기 통신으로 목록출력할 때 이걸 항상 넣어주어야 된다.
                    //데이터가 없을 때는 호출되지않게 같이 넣어주어야한다.,
                    data.list &&
                    data.list.map((row,idx)=><BoardRowList key={idx} row={row} no={data.no} idx={idx}
                                                           currentPage={currentPage}/>)

                }

                </tbody>
            </table>
            <div style={{width:'700px',textAlign:'center'}}>
                {/*    페이징 처리 */}
                {
                    //이전
                    data.startPage>1?
                        <Link to={`/board/list/${data.startPage-1}`} style={{textDecoration:'none',cursor:'pointer',marginRight:'5px'}}>
                            이전
                        </Link>:''
                }

                {
                    data.parr &&
                    data.parr.map((pno,i)=>
                        <NavLink to={`/board/list/${pno}`} style={{textDecoration:'none'}}>
                            <b style={{marginRight:'5px',color:pno===Number(currentPage)?'red':'black'}}>{pno}</b>
                        </NavLink>)
                }

                {
                    //다음
                    data.endPage<data.totalPage?
                        <Link to={`/board/list/${data.endPage+1}`} style={{textDecoration:'none',cursor:'pointer'}}>
                        다음
                        </Link>:''
                }
            </div>
        </div>
    );
}

export default BoardList;