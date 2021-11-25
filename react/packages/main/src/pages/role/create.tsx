import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Button,
    Label,
    FormGroup,
    Input,
    Alert,
} from "@doar/components";
import { useForm } from "react-hook-form";
import { hasKey } from "@doar/shared/methods";
import { createRoleUrl } from "../../config";
import { useAppSelector } from "../../redux/hooks";
import PermissionCheckbox from "../../components/user/PermissionCheckbox";
import { Trans } from "../../lang";

interface FormData {
    name: string;
    permission_name: any;
    api_token: string;
}

const CreateRoleForm: React.FC<any> = ({ ...props }: any) => {
    console.log(props);
    const { apiToken, language } = useAppSelector((state) => state.login);
    const [msgType, setMsgType] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (formData: FormData) => {
        console.log(formData);
        const checkedList = document.querySelectorAll<HTMLInputElement>(
            'input[name="permissionList"]:checked'
        );
        console.log(checkedList.length);
        if (checkedList.length === 0) {
            console.log("working");
            setMsgType("error");
            setErrorMsg("Please check any permission");
        } else {
            const permissionArr = [];
            for (let i = 0; i < checkedList.length; i += 1) {
                permissionArr.push(checkedList[i].value);
            }
            const saveFormData = formData;
            saveFormData.api_token = apiToken;
            saveFormData.permission_name = permissionArr;
            console.log(saveFormData);
            axios
                .post(createRoleUrl, saveFormData)
                .then((response: AxiosResponse) => {
                    console.log(response);
                    const { status, data, message } = response.data;
                    if (status) {
                        props.getRoles();
                        setMsgType("success");
                        setErrorMsg(message);
                    } else {
                        console.log(message);
                        setMsgType("danger");
                        if (typeof message === "object") {
                            let errMsg = "";
                            Object.keys(message).map((key) => {
                                errMsg += message[key][0];
                                return errMsg;
                            });
                            setErrorMsg(errMsg);
                        } else {
                            setErrorMsg(message);
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setMsgType("danger");
                    setErrorMsg("Something went wrong !");
                });
        }
    };

    return (
        <Card width={["100%", "100%"]}>
            <CardHeader>
                <CardTitle as="h5">{Trans("ADD_ROLE", language)}</CardTitle>
            </CardHeader>
            <CardBody>
                {msgType.length > 2 &&
                    (msgType === "success" ? (
                        <Alert
                            color="success"
                            isDismissible
                            variant="contained"
                            solid={false}
                            hasLink={false}
                            hasIcon={false}
                        >
                            {errorMsg}
                        </Alert>
                    ) : (
                        <Alert
                            color="danger"
                            isDismissible
                            variant="contained"
                            solid={false}
                            hasLink={false}
                            hasIcon={false}
                        >
                            {errorMsg}
                        </Alert>
                    ))}
                <form action="#" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <FormGroup mb="20px">
                        <Label display="block" mb="5px" htmlFor="name">
                            {Trans("ROLE_NAME", language)}
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            feedbackText={errors?.name?.message}
                            state={hasKey(errors, "name") ? "error" : "success"}
                            showState={!!hasKey(errors, "name")}
                            {...register("role_name", {
                                required: "Role Name is required",
                            })}
                        />
                    </FormGroup>
                    <FormGroup mb="20px">
                        <Label
                            display="block"
                            mb="5px"
                            htmlFor="permissionList"
                        >
                            {Trans("PERMISSION", language)}
                        </Label>
                        <PermissionCheckbox Compname="permissionList" />
                    </FormGroup>
                    <Button type="submit" color="brand2" fullwidth>
                        {Trans("CREATE", language)}
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};

export default CreateRoleForm;
