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
    Alert,
} from "@doar/components";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import { generalSettingUrl, generalSettingFirstUrl } from "src/config";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Header from "../header";
import { StyledCard } from "./style";
import { Trans } from "../../../lang";
import { updateLangState } from "../../../redux/slices/login";

interface FormData {
    website_name: string;
    currency: "USD" | "INR";
    api_token: string;
    default_language: string;
}

const GeneralSetting: FC = () => {
    const dispatch = useAppDispatch();
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
            .post(generalSettingFirstUrl, formData)
            .then((response: AxiosResponse) => {
                console.log(response);
                const { status, data, message } = response.data;
                console.log(data);
                if (data !== null) {
                    console.log("dsf");
                    setValue("default_language", data.default_language);
                    setValue("currency", data.currency);
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
            .post(generalSettingUrl, saveFormData)
            .then((response: AxiosResponse) => {
                console.log(response);
                const { status, message } = response.data;
                if (status) {
                    dispatch(updateLangState(formData.default_language));
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
                    {Trans("G_SETTING", language)}
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
                                    htmlFor="default_language"
                                >
                                    {Trans("DEFAULT_LANG", language)}
                                </Label>
                                <select
                                    id="default_language"
                                    {...register("default_language", {
                                        required: "Language is required",
                                    })}
                                >
                                    <option value="en">English</option>
                                    <option value="es">Spanish</option>
                                </select>
                            </FormGroup>
                        </Col>
                        <Col lg={4}>
                            <FormGroup mb="20px">
                                <Label
                                    display="block"
                                    mb="5px"
                                    htmlFor="currency"
                                >
                                    {Trans("CURRENCY", language)}
                                </Label>
                                <select
                                    id="currency"
                                    {...register("currency", {
                                        required: "Currency is required",
                                    })}
                                >
                                    <option value="USD">USD</option>
                                    <option value="INR">INR</option>
                                </select>
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

export default GeneralSetting;
