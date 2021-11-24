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
import { useAppSelector } from "../../../redux/hooks";

interface FormData {
    name: string;
    permission_name: any;
    api_token: string;
}

const WebsiteSetting: React.FC<any> = ({ ...props }: any) => {
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
        console.log(formData);
    };
    return (
        <Card width={["100%", "100%"]}>
            <CardHeader>
                <CardTitle as="h5">Website Setting</CardTitle>
            </CardHeader>
            <CardBody>
                <form action="#" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <FormGroup mb="20px">
                        <Label display="block" mb="5px" htmlFor="name">
                            Website name
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter your website name"
                            feedbackText={errors?.name?.message}
                            state={hasKey(errors, "name") ? "error" : "success"}
                            showState={!!hasKey(errors, "name")}
                            {...register("role_name", {
                                required: "Role Name is required",
                            })}
                        />
                    </FormGroup>
                    <Button type="submit" color="brand2" fullwidth>
                        Update
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};

export default WebsiteSetting;
