import React from 'react';
import '../App.css';
import DaumPostcodeEmbed from "react-daum-postcode";
function MemberForm(props) {

    const [openPostcode, setOpenPostcode] = React.useState(false);

    /**
     * handler
     */
    const handle = {
        // 버튼 클릭 이벤트
        clickButton: () => {
            setOpenPostcode(current => !current);
        },

        // 주소 선택 이벤트
        //데이터가 json방식으로 넘어온다.
        selectAddress: (data) => {
            console.log(`
                주소: ${data.address},
                우편번호: ${data.zonecode}
            `)
            setOpenPostcode(false);
        },
    }

    return (
        <div>
                <h5>회원가입</h5>

            <button onClick={handle.clickButton}>toggle</button>

            {openPostcode &&
                <DaumPostcodeEmbed
                    onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                    autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                    defaultQuery='판교역로 235' // 팝업을 열때 기본적으로 입력되는 검색어
                />}



        </div>
    );
}

export default MemberForm;