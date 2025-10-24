import React from "react";
import { faHouse, faListCheck, faFile, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/header/css";
const Header:React.FC=()=>{
    return(
    <div className="flex-col">
        <div>
            <FontAwesomeIcon icon={faHouse} />
            <div>홈</div>
        </div>    
        <div>
            <FontAwesomeIcon icon={faListCheck} />
            <div>할일</div>
        </div>    
        <div>
            <FontAwesomeIcon icon={faFile} />
            <div>기출문제</div>
        </div>    
        <div>
            <FontAwesomeIcon icon={faComment} />
            <div>AI</div>
        </div>    
    </div>);
}
export default Header;