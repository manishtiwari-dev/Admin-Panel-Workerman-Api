import React, { useState } from "react";
import { useAppSelector } from "src/redux/hooks";
import "./style.css";

const Pagination: React.FC<any> = ({ ...props }: any) => {
    console.log(props);
    const { totalPage, currPage, getUser } = props;
    const { apiToken } = useAppSelector((state) => state.login);
    console.log(getUser);

    const getPage = () => {
        console.log("xzcz");
        const filterData = {
            api_token: apiToken,
            page: 2,
            perPage: 10,
            search: "",
            sortBy: "id",
            orderBY: "ASC",
        };
        console.log(filterData);
        getUser(filterData);
    };
    const items = [];
    for (let index = 1; index <= totalPage; index += 1) {
        let activeItem = "";
        if (index === currPage) activeItem = "active";
        items.push(
            <li key={index} className={`page-number ${activeItem}`}>
                <a href="#!" onClick={getPage}>
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
