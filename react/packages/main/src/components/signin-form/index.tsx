import { FC, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";
import { FormGroup, Label, Input, Anchor, Button } from "@doar/components";
import { useForm } from "react-hook-form";
import { hasKey } from "@doar/shared/methods";
import { LoginInfo } from "../../models/login.interface";
import { loginUrl } from "../../config";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateLoginState } from "../../redux/slices/login";
import {
    StyledWrap,
    StyledTitle,
    StyledDesc,
    StyledLabelWrap,
    StyledDivider,
    StyledBottomText,
} from "./style";

const SigninForm: FC = () => {
    const dispatch = useAppDispatch();
    const { apiToken } = useAppSelector((state) => state.login);
    const history = useHistory();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [resError, setresError] = useState("");
    const onSubmit = (formData: LoginInfo) => {
        setresError("");
        axios
            .post(loginUrl, formData)
            .then((response: AxiosResponse) => {
                const { status, message, data } = response.data;
                if (status) {
                    console.log(data);
                    dispatch(updateLoginState(data));
                    setresError("You logged in !");
                    history.push("/");
                } else {
                    console.log(message);
                    setresError(message);
                }
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    };
    return (
        <StyledWrap>
            <StyledTitle>Sign In</StyledTitle>
            <StyledDesc>Welcome back! Please signin to continue.</StyledDesc>
            <StyledDesc>{resError}</StyledDesc>
            <form action="#" onSubmit={handleSubmit(onSubmit)} noValidate>
                <FormGroup mb="20px">
                    <Label display="block" mb="5px" htmlFor="email">
                        Email address
                    </Label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="yourname@yourmail.com"
                        feedbackText={errors?.email?.message}
                        state={hasKey(errors, "email") ? "error" : "success"}
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
                    <StyledLabelWrap>
                        <Label display="block" mb="5px" htmlFor="password">
                            Password
                        </Label>
                        <Anchor path="/forgot-password" fontSize="13px">
                            Forgot password?
                        </Anchor>
                    </StyledLabelWrap>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        feedbackText={errors?.password?.message}
                        state={hasKey(errors, "password") ? "error" : "success"}
                        showState={!!hasKey(errors, "password")}
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Minimum length is 6",
                            },
                            maxLength: {
                                value: 50,
                                message: "Minimum length is 50",
                            },
                        })}
                    />
                </FormGroup>
                <Button type="submit" color="brand2" fullwidth>
                    Sign In
                </Button>
                <StyledDivider>or</StyledDivider>
                <Button variant="outlined" color="facebook" fullwidth>
                    Sign In With Facebook
                </Button>
                <Button
                    variant="outlined"
                    color="twitter"
                    mt="0.5rem"
                    fullwidth
                >
                    Sign In With Twitter
                </Button>
                <StyledBottomText>
                    Don&apos;t have an account?{" "}
                    <Anchor path="/signup">Create an Account</Anchor>
                </StyledBottomText>
            </form>
        </StyledWrap>
    );
};

export default SigninForm;
