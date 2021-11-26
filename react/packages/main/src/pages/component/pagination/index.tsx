import React, { useState } from "react";
import "./style.css";

const Pagination: React.FC<any> = ({ ...props }: any) => {
    console.log(props);
    const { totalPage, currPage } = props;
    const items = [];
    for (let index = 1; index <= totalPage; index += 1) {
        let activeItem = "";
        if (index === currPage) activeItem = "active";
        items.push(
            <li key={index} className={`page-number ${activeItem}`}>
                <a href="#!" onClick={props.getUser}>
                    {index}
                </a>
            </li>
        );
    }
    return (
        <div className="pagination">
            <ul className="pagination-2">
                <li className="page-number prev">
                    <a href="#!">&laquo;</a>
                </li>
                {items}
                <li className="page-number prev">
                    <a href="#!">&raquo;</a>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
