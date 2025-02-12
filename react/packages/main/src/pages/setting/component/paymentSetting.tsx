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
    Spinner,
} from "@doar/components";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import { hasKey } from "@doar/shared/methods";
import { paymentSettingUrl, paymentSettingFirstUrl } from "src/config";
import { useAppSelector } from "../../../redux/hooks";
import Header from "../header";
import { StyledCard } from "./style";
import { Trans } from "../../../lang";

interface FormData {
    paytm_status: "on" | "off";
    paytm_mode: "live" | "sandbox";
    paytm_merchant_key: string;
    paytm_secret_key: string;
    api_token: string;
}

const PaymentSetting: FC = () => {
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
            .post(paymentSettingFirstUrl, formData)
            .then((response: AxiosResponse) => {
                console.log(response);
                const { status, data, message } = response.data;
                console.log(data);
                if (data !== null) {
                    console.log("dsf");
                    setValue("paytm_status", data.paytm_status);
                    setValue("paytm_mode", data.paytm_mode);
                    setValue("paytm_merchant_key", data.paytm_merchant_key);
                    setValue("paytm_secret_key", data.paytm_secret_key);
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
            .post(paymentSettingUrl, saveFormData)
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
                    {Trans("PAY_SETTING", language)}
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
                        <Col lg={3}>
                            <FormGroup mb="20px">
                                <Label
                                    display="block"
                                    mb="5px"
                                    htmlFor="paytm_status"
                                >
                                    {Trans("PAYTM_ENABLE", language)}
                                </Label>
                                <select
                                    id="paytm_status"
                                    {...register("paytm_status", {
                                        required: "Paytm mode is required",
                                    })}
                                >
                                    <option value="on">On</option>
                                    <option value="off">Off</option>
                                </select>
                            </FormGroup>
                        </Col>
                        <Col lg={3}>
                            <FormGroup mb="20px">
                                <Label
                                    display="block"
                                    mb="5px"
                                    htmlFor="paytm_mode"
                                >
                                    {Trans("PAYTM_MODE", language)}
                                </Label>
                                <select
                                    id="paytm_mode"
                                    {...register("paytm_mode", {
                                        required: "Paytm mode is required",
                                    })}
                                >
                                    <option value="sandbox">Sandbox</option>
                                    <option value="live">Live</option>
                                </select>
                            </FormGroup>
                        </Col>
                        <Col lg={3}>
                            <FormGroup mb="20px">
                                <Label
                                    display="block"
                                    mb="5px"
                                    htmlFor="paytm_key"
                                >
                                    {Trans("PAYTM_KEY", language)}
                                </Label>
                                <Input
                                    id="paytm_key"
                                    type="text"
                                    placeholder="Enter paytm merchant"
                                    feedbackText={errors?.name?.message}
                                    state={
                                        hasKey(errors, "name")
                                            ? "error"
                                            : "success"
                                    }
                                    showState={!!hasKey(errors, "name")}
                                    {...register("paytm_merchant_key", {
                                        required: "Paytm merchant is required",
                                    })}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={3}>
                            <FormGroup mb="20px">
                                <Label
                                    display="block"
                                    mb="5px"
                                    htmlFor="paytm_secret"
                                >
                                    {Trans("PAYTM_SECRET", language)}
                                </Label>
                                <Input
                                    id="paytm_key"
                                    type="text"
                                    placeholder="Enter paytm secret"
                                    feedbackText={errors?.name?.message}
                                    state={
                                        hasKey(errors, "name")
                                            ? "error"
                                            : "success"
                                    }
                                    showState={!!hasKey(errors, "name")}
                                    {...register("paytm_secret_key", {
                                        required: "Paytm secret is required",
                                    })}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4}>
                            <Button type="submit" color="brand2">
                                {Trans("UPDATE", language)}
                            </Button>
                            <Button hasIcon size="md" color="brand2" disabled>
                                <Spinner size="sm" /> Loading
                            </Button>
                        </Col>
                    </Row>
                </form>
            </CardBody>
        </StyledCard>
    );
};

export default PaymentSetting;
