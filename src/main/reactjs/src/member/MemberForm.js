import React, {useState} from 'react';
import '../App.css';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import DaumPostcodeEmbed from "react-daum-postcode";
import Axios from "axios";
import {useNavigate} from "react-router-dom";
function MemberForm(props) {

    const [openPostcode, setOpenPostcode] = useState(false);

    const [myid,setMyid]=useState('');
    const [mypass,setMypass]=useState('');
    const [myaddress1,setMyaddress1]=useState('');
    const [myaddress2,setMyaddress2]=useState('');
    const [myname,setMyname]=useState('');
    const [btnok,setBtnok]=useState(false); //서브밋 햇을때  false

    const navi=useNavigate();


    const onSubmitEvent=(e)=>{
        e.preventDefault(); //기본 이벤트 무효화
        if(!btnok)
        {
            //만약 btnok가 false면 중복확인눌러라
            alert("중복확인 버튼을 눌러주세요");
            return;
        }
        Axios.post("/member/insert",{myname,myid,mypass,myaddress:`${myaddress1}${myaddress2}`})
            .then(res=>{
                alert("가입 완료");
                navi("/login");
            })
    }

    //중복확인 버튼 이벤트
    const btnJungbok=()=>{
        let url="/member/searchid?myid="+myid;
        Axios.get(url)
            .then(res=>{
                if(Number(res.data)===0){
                    alert("가입가능");
                    setBtnok(true);
                }else {
                    alert("이미가입되어있어여");
                    setMyid('');
                    setBtnok(false);
                }
            })
        setBtnok(true);
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setOpenPostcode(current => !current);
    };

    const handle = {
        // 주소 선택 이벤트
        //데이터가 json방식으로 넘어온다.
        selectAddress: (data) => {
            console.log(`
                주소: ${data.address}
                아파트명 : ${data.buildingName}
                우편번호: ${data.zonecode}
            `)
            setMyaddress1(`(${data.zonecode})${data.buildingName},${data.address}`)
            setOpen(false);
            setOpenPostcode(false);
        },
    }

    const handleClose = () => {
        setOpen(false);
        setOpenPostcode(false);
    };





    return (
        <div>
            <form onSubmit={onSubmitEvent}>
                <table className={"table"} style={{width:"500px"}}>
                    <caption align={"top"}><b>회원가입</b></caption>
                    <tbody>

                    <tr>
                        <th style={{width:'100px',backgroundColor:'#b0e0e6'}}>이름</th>
                        <td>
                            <input type={"text"} className={"form-control"}
                                   placeholder={"이름입력"} required
                                   value={myname} onChange={(e)=>setMyname(e.target.value)}/>
                        </td>
                    </tr>

                    <tr>
                        <th style={{width:'100px',backgroundColor:'#b0e0e6'}}>아이디</th>
                        <td className={"input-group"}>
                            <input type={"text"} className={"form-control"}
                                   placeholder={"아이디"} required
                                   value={myid} onChange={(e)=>{
                                setMyid(e.target.value)
                                setBtnok(false);
                            }}/>

                            <button type={"button"} className={"btn btn-outline-warning btn-sm"}
                                    onClick={btnJungbok}>중복확인 </button>
                        </td>
                    </tr>

                    <tr>
                        <th style={{width:'100px',backgroundColor:'#b0e0e6'}}>비밀번호</th>
                        <td>
                            <input type={"password"} className={"form-control"}
                                   required style={{width:'120px'}}
                                   value={mypass} onChange={(e)=>setMypass(e.target.value)}/>
                        </td>
                    </tr>

                    <tr>
                        <th style={{width:'100px',backgroundColor:'#b0e0e6'}}>주소</th>
                        <td>
                            <div className={'input-group'} >
                                <input type={"text"} className={"form-control"}
                                       required style={{width:'120px'}} readOnly
                                       value={myaddress1}/>

                                <button type={'button'} className={'btn btn-sm btn-outline-primary'}
                                onClick={handleClickOpen}>주소검색</button>
                            </div>

                            <div>
                                <input type={'text'} className={'form-control'}
                                       value={myaddress2} onChange={(e)=>setMyaddress2(e.target.value)}
                                       placeholder={'상세주소를 입력해주세요'}/>
                            </div>
                        </td>
                    </tr>




                    <tr>
                        <td colSpan={2} align={'center'}>
                            <button type={"submit"} className={"btn btn-outline-primary"} style={{width:'100px'}}>
                                가입하기
                            </button>
                        </td>
                    </tr>


                    </tbody>
                </table>
            </form>
            {/* 다이얼로그 */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"우편번호 검색"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {openPostcode &&
                            <DaumPostcodeEmbed
                                onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                                autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                                defaultQuery='강남대로 94길 20' // 팝업을 열때 기본적으로 입력되는 검색어
                            />}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

export default MemberForm;