import React from 'react';

function MemberRowList(props) {

    const {idx,row,onDelete}=props;


    return (
            <tr>
                <td>{idx+1}</td>
                <td>{row.myname}</td>
                <td>{row.myid}</td>
                <td>{row.myaddress}</td>
                <td>{row.gaipday}</td>
                <td>
                    <button type={"button"} className={"btn btn-outline-danger"}
                    onClick={()=>{
                        const b=window.confirm("삭제하려면확인누르세요");
                        if(b){
                            onDelete(row.num);
                        }
                    }}
                    >삭제</button>
                </td>
            </tr>
    );
}

export default MemberRowList;