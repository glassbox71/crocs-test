// import React from 'react';

// const ButtonWrap = ({ btnText, onClick }) => {
//     return (
//         <div className="btn_wrap">
//             <button className="monthly_btn" onClick={onClick}>
//                 <p>{btnText}</p>
//             </button>
//         </div>
//     );
// };

// export default ButtonWrap;

import React from 'react';

const ButtonWrap = ({ btnText, onClick, isActive }) => {
    return (
        <div className="btn_wrap">
            <button className={`monthly_btn ${isActive ? 'slide_exit' : ''}`} onClick={onClick}>
                <p>{btnText}</p>
            </button>
        </div>
    );
};

export default ButtonWrap;
