import { FC } from "react";
import { MoreHorizontal, ThumbsUp, MessageSquare, Share } from "react-feather";
import {
    CardBody,
    Heading,
    Anchor,
    Card,
    CardHeader,
    CardTitle,
    Row,
    Col,
    Button,
    Label,
    FormGroup,
    Input,
} from "@doar/components";
import image from "@doar/shared/images/img15.jpg";
import { useForm } from "react-hook-form";
import { hasKey } from "@doar/shared/methods";
import Header from "../header";
import Footer from "../footer";
import { StyledCard, StyledRole, StyledTime, StyledGrayBox } from "./style";

const WebsiteSetting: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (formData: FormData) => {
        console.log(formData);
    };
    return (
        <StyledCard mb={["20px", null, null, "25px"]}>
            <Header>
                <Heading tt="uppercase" fontWeight="600" mb="0px">
                    General Setting
                </Heading>
                <Anchor path="#!" variant="link3">
                    <MoreHorizontal width={18} height={18} />
                </Anchor>
            </Header>
            <CardBody>
                <form action="#" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Row>
                        <Col lg={4}>
                            <FormGroup mb="20px">
                                <Label display="block" mb="5px" htmlFor="name">
                                    Website name
                                </Label>
                                <Input
                                    id="webisteName"
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
                    </Row>
                    <Row>
                        <Col lg={4}>
                            <Button type="submit" color="brand2">
                                Update
                            </Button>
                        </Col>
                    </Row>
                </form>
            </CardBody>
        </StyledCard>
    );
};

export default WebsiteSetting;
