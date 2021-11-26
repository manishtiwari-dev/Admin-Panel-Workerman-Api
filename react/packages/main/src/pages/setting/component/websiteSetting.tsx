import { FC, useEffect, useState } from "react";
import { MoreHorizontal } from "react-feather";
import {
    CardBody,
    Heading,
    Anchor,
    Row,
    Col,
    Button,
    Label,
    FormGroup,
    Input,
    Alert,
} from "@doar/components";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import { hasKey } from "@doar/shared/methods";
import { websiteSettingUrl, websiteSettingFirstUrl } from "src/config";
import { useAppSelector } from "../../../redux/hooks";
import Header from "../header";
import { StyledCard } from "./style";
import { Trans } from "../../../lang";

interface FormData {
    website_name: string;
    api_token: string;
}

const WebsiteSetting: FC = () => {
    const { apiToken, language } = useAppSelector((state) => state.login);
    const [msgType, setMsgType] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();
    const getSettingInfo = () => {
        const formData = {
            api_token: apiToken,
        };
        axios
            .post(websiteSettingFirstUrl, formData)
            .then((response: AxiosResponse) => {
                console.log(response);
                const { status, data, message } = response.data;
                console.log(data);
                if (data !== null) {
                    console.log("dsf");
                    setValue("website_name", data.website_name);
                }
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    };
    const onSubmit = (formData: FormData) => {
        console.log(formData);
        const saveFormData = formData;
        saveFormData.api_token = apiToken;
        console.log(saveFormData);
        axios
            .post(websiteSettingUrl, saveFormData)
            .then((response: AxiosResponse) => {
                console.log(response);
                const { status, message } = response.data;
                if (status) {
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
    useEffect(() => {
        getSettingInfo();
    }, []);
    return (
        <StyledCard mb={["20px", null, null, "25px"]}>
            <Header>
                <Heading tt="uppercase" fontWeight="600" mb="0px">
                    {Trans("WEB_SETTING", language)}
                </Heading>
                <Anchor path="#!" variant="link3">
                    <MoreHorizontal width={18} height={18} />
                </Anchor>
            </Header>
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
                <form
                    action="#"
                    onSubmit={handleSubmit(onSubmit)}
                    encType="multipart/form-data"
                    noValidate
                >
                    <Row>
                        <Col lg={4}>
                            <FormGroup mb="20px">
                                <Label
                                    display="block"
                                    mb="5px"
                                    htmlFor="website_name"
                                >
                                    {Trans("WEBSITE_NAME", language)}
                                </Label>
                                <Input
                                    id="website_name"
                                    type="text"
                                    placeholder="Enter website name"
                                    feedbackText={errors?.name?.message}
                                    state={
                                        hasKey(errors, "name")
                                            ? "error"
                                            : "success"
                                    }
                                    showState={!!hasKey(errors, "name")}
                                    {...register("website_name", {
                                        required: "Website name is required",
                                    })}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={4}>
                            <FormGroup mb="20px">
                                <Label
                                    display="block"
                                    mb="5px"
                                    htmlFor="website_logo"
                                >
                                    {Trans("WEBSITE_LOGO", language)}
                                </Label>
                                <Input
                                    id="website_logo"
                                    type="file"
                                    placeholder="Enter website logo"
                                    feedbackText={errors?.name?.message}
                                    state={
                                        hasKey(errors, "name")
                                            ? "error"
                                            : "success"
                                    }
                                    showState={!!hasKey(errors, "website_logo")}
                                    {...register("website_logo")}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4}>
                            <Button type="submit" color="brand2">
                                {Trans("UPDATE", language)}
                            </Button>
                        </Col>
                    </Row>
                </form>
            </CardBody>
        </StyledCard>
    );
};

export default WebsiteSetting;
