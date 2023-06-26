import React from 'react';
import {NavLink} from "react-router-dom";
import noimage from '../noimage.jpg';
function BoardRowList(props) {
    const {idx,no,row,currentPage}=props;

    const photoUrl1=process.env.REACT_APP_SMALL_BOARDURL1;
    const photoUrl2=process.env.REACT_APP_SMALL_BOARDURL2;

    return (
        <tr>
            {/*idx를 뺴야 순차적으로 나온다*/}
            <td>{no-idx}</td>
            <td>
                <NavLink to={`/board/detail/${row.num}/${currentPage}`} style={{textDecoration:'none', color:'black',cursor:'cell'}}>
                    {/*{ 40x40 섬네일 이미지 나오게하기 사진이 없을 경우 noimage로 대치 }*/}
                    {
                        row.photo==null?
                            <img alt={''} src={noimage}
                            style={{width:'40px',height:'40px',marginRight:'10px'}}/>:
                            <img alt={''} src={`${photoUrl1}${row.photo}${photoUrl2}`} style={{marginRight:'20px'}}/>
                    }
                    <b>{row.subject}</b>
                </NavLink>
            </td>
            <td>{row.myname}</td>
            <td>{row.writeday.substring(0,10)}</td>
            <td>{row.readcount}</td>
        </tr>
    );
}

export default BoardRowList;
