import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import {
    Row,
    Col,
    Table,
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
import Layout from "../../layouts";
import Content from "../../layouts/content";
import PageHeader from "../../components/page-header";
import SEO from "../../components/seo";
import {
    roleUrl,
    editRoleUrl,
    updateRoleUrl,
    deleteRoleUrl,
} from "../../config";
import { useAppSelector } from "../../redux/hooks";
import CheckPermission from "../../helper";
import PaymentSetting from "./component/paymentSetting";
import WebsiteSetting from "./component/websiteSetting";

const AccountSetting: React.FC = () => {
    return (
        <Layout>
            <SEO />
            <Content borderBottomWidth="1px">
                <PageHeader
                    prev={[{ text: "Dashboard", link: "/" }]}
                    title="Setting"
                    wcText="Setting"
                />
            </Content>
            <Content mt={[null, null, null, "0px"]}>
                <Row>
                    <Col lg={4}>
                        <WebsiteSetting />
                    </Col>
                    <Col lg={4}>
                        <PaymentSetting />
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default AccountSetting;
