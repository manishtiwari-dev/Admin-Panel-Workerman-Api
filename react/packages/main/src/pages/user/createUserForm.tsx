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
import { createUserUrl } from "../../config";
import { useAppSelector } from "../../redux/hooks";
import RoleOption from "../../components/user/RoleOption";

interface FormData {
    name: string;
    email: string;
    api_token: string;
    password: string;
    role_name: string;
}

const CreateUserForm: React.FC<any> = ({ ...props }: any) => {
    console.log(props);
    const { apiToken } = useAppSelector((state) => state.login);
    const [msgType, setMsgType] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (formData: FormData) => {
        const saveFormData = formData;
        saveFormData.api_token = apiToken;
        axios
            .post(createUserUrl, saveFormData)
            .then((response: AxiosResponse) => {
                console.log(response);
                const { status, data, message } = response.data;
                if (status) {
                    props.getUser();
                    setMsgType("success");
                    setErrorMsg(message);
                } else {
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
    };

    return (
        <Card width={["100%", "100%"]}>
            <CardHeader>
                <CardTitle as="h5">Add User</CardTitle>
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
                            User Name
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            feedbackText={errors?.name?.message}
                            state={hasKey(errors, "name") ? "error" : "success"}
                            showState={!!hasKey(errors, "name")}
                            {...register("name", {
                                required: "User Name is required",
                            })}
                        />
                    </FormGroup>
                    <FormGroup mb="20px">
                        <Label display="block" mb="5px" htmlFor="email">
                            Email address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email address"
                            state={
                                hasKey(errors, "email") ? "error" : "success"
                            }
                            showState={!!hasKey(errors, "email")}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "invalid email address",
                                },
                            })}
                        />
                    </FormGroup>
                    <FormGroup mb="20px">
                        <Label display="block" mb="5px" htmlFor="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            state={
                                hasKey(errors, "password") ? "error" : "success"
                            }
                            showState={!!hasKey(errors, "password")}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Minimum length is 6",
                                },
                            })}
                        />
                    </FormGroup>
                    <FormGroup mb="20px">
                        <Label display="block" mb="5px" htmlFor="role_name">
                            Role
                        </Label>
                        <select
                            id="role_name"
                            {...register("role_name", {
                                required: "Role name is required",
                            })}
                        >
                            <RoleOption />
                        </select>
                    </FormGroup>
                    <Button type="submit" color="brand2" fullwidth>
                        Create user
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};

export default CreateUserForm;
