import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { roleUrl } from "../../config";
import { useAppSelector } from "../../redux/hooks";

interface RoleInfo {
    id: number;
    name: string;
    display_name: string;
}

const RoleOption: React.FC<any> = () => {
    const { apiToken } = useAppSelector((state) => state.login);
    const [roleList, setroleList] = useState<RoleInfo[]>([]);
    const getRoleList = () => {
        const formData = {
            api_token: apiToken,
        };
        axios
            .post(roleUrl, formData)
            .then((response: AxiosResponse) => {
                console.log(response);
                const { status, data, message } = response.data;
                if (status) setroleList(data);
                else alert(message);
            })
            .catch((error) => {
                alert("Something went wrong !");
                console.error("There was an error!", error);
            });
    };
    useEffect(() => {
        getRoleList();
    }, []);

    return (
        <>
            {roleList &&
                roleList.map((list) => {
                    const { name } = list;
                    return (
                        <option key={list.id} value={name}>
                            {list.display_name}
                        </option>
                    );
                })}
        </>
    );
};

export default RoleOption;
