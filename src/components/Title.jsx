import React from 'react';

const Title = ({ title, subTitle }) => {
    return (
        <div className="title_wrap">
            <h2 className="section_title" dangerouslySetInnerHTML={{ __html: title }} />
            <p className="section_sub_title" dangerouslySetInnerHTML={{ __html: subTitle }} />
        </div>
    );
};

export default Title;
