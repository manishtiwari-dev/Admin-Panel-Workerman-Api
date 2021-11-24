import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Checkbox } from "@doar/components";
import { useForm } from "react-hook-form";
import { permissionUrl } from "../../config";
import { useAppSelector } from "../../redux/hooks";

interface PerInfo {
    id: number;
    name: string;
}
interface PropSType {
    Compname: string;
}

const PermissionCheckbox: React.FC<any> = ({ ...props }: PropSType) => {
    console.log(props);
    const { apiToken } = useAppSelector((state) => state.login);
    const [permissionList, setPermissionList] = useState<PerInfo[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const getPerList = () => {
        const formData = {
            api_token: apiToken,
        };
        axios
            .post(permissionUrl, formData)
            .then((response: AxiosResponse) => {
                console.log(response);
                const { status, data, message } = response.data;
                if (status) setPermissionList(data);
                else alert(message);
            })
            .catch((error) => {
                alert("Something went wrong !");
                console.error("There was an error!", error);
            });
    };
    useEffect(() => {
        getPerList();
    }, []);

    return (
        <>
            {permissionList &&
                permissionList.map((list, index) => {
                    const { name } = list;
                    return (
                        <Checkbox
                            key={list.id}
                            className="permissionBox"
                            id={`${props.Compname}OR${list.id}`}
                            label={name}
                            name={props.Compname}
                            value={name}
                        />
                    );
                })}
        </>
    );
};

export default PermissionCheckbox;
