import React, {useState} from 'react';
import '../App.css';
import {useNavigate, useParams} from "react-router-dom";
import Axios from "axios";
function BoardForm(props) {


    const [subject,setSubject]=useState('');
    const [photo,setPhoto]=useState('');
    const [content,setContent]=useState('');

    //입력 후 목록으로 가기위햐서 navi필요
    const navi=useNavigate();

    const {currentPage}=useParams();
    console.log({currentPage}); //페이지가 안넘어 갔을 때 어떻게 출력되었는지 보려구

    //이미지 경로
    const photoUrl=process.env.REACT_APP_BOARDURL;
    //세션 스토리지에 저장된 아이디와 이름 가져오기
    //보낼 떄 같이 보낼 것이다.
    const myid=sessionStorage.myid;
    const myname=sessionStorage.myname;

    //파일 업로드
    const onUploadEvent=(e)=>{
        const uploadFile=new FormData();
        //back앤드의 multifile 의 이름과 같거나 // requestparm으로 변수명을 바까줘야한다.
        uploadFile.append("upload",e.target.files[0]);
        Axios({
            method:"post",
            url:'/board/upload',
            data:uploadFile,
            headers:{"Content-Type":"multipart/form-data"}
        }).then(res=>{
            setPhoto(res.data);
            //res의 포토값이 넘어온다 그것을 셋포토에 넣어주며노딘다
        });
    }

    const onSubmitEvent=(e)=>{
        e.preventDefault();
        Axios.post("/board/insert",{myid,myname,subject,content})
            .then(res=>{
                //목록으리 이동
                navi("/board/list/1")
            })
    }

    return (
        <div style={{marginLeft:"100px"}}>
            <form onSubmit={onSubmitEvent}>
                <table className={"table"} style={{width:'800px'}}>
                    <caption align={"top"}><b>게시판 글스기</b></caption>
                    <tbody>
                    <tr>
                        <th style={{backgroundColor:"#ddd",width:"100px"}}>제목</th>
                        <td>
                            <input type={"text"} className={"form-control"} required
                                   onChange={(e)=>setSubject(e.target.value)} value={subject}/>
                        </td>
                    </tr>

                    <tr>
                        <th style={{backgroundColor:"#ddd",width:"100px"}}>사진</th>
                        <td>
                            <input type={"file"} className={"form-control"} required
                                   onChange={onUploadEvent}/>
                        </td>
                    </tr>
                    
                    <tr>
                        <th style={{backgroundColor:"#ddd",width:"100px"}}>내용</th>
                        <td>
                            <textarea style={{width:'100%',height:'100px'}}
                            required value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2} align={"center"}>
                            <button type={"submit"} className={"btn btn-outline-warning"}
                            style={{width:'100px'}}>글 저장</button>
                        </td>
                    </tr>

                    </tbody>
                </table>
            </form>
            <img alt={""} src={`${photoUrl}${photo}`}
            style={{width:"200px",position:"absolute",left:"1100px",top:"160px"}}/>
        </div>
    );
}

export default BoardForm;