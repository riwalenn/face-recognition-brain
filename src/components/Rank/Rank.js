import React from "react";

const Rank = ({ name, entries }) => {
    return (
        <div className='center' style={{alignItems: "center"}}>
            <div className='f3 pa3'>
                {`${name}, your current entry count is...`}
            </div>
            <div className='f1'>
                {entries}
            </div>
        </div>
    );
}

export default Rank;