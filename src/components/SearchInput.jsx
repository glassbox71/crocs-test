import React from 'react';

const SearchInput = ({ inputText, onChange, onSearch }) => {
    return (
        <div className="search_input">
            <input
                type="text"
                placeholder="SEARCH"
                value={inputText}
                onChange={onChange} // props로 받은 함수 사용
                onKeyDown={(e) => e.key === 'Enter' && onSearch(e)} // 엔터 입력 시 검색
            />
            <button className="search_btn" onClick={onSearch}>
                <img src="/images/search_icon.svg" alt="search_icon" />
            </button>
        </div>
    );
};

export default SearchInput;
