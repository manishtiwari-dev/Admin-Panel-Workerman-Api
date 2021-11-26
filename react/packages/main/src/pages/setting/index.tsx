import React from "react";
import { useParams } from "react-router-dom";
import { Media, MediaBody } from "@doar/components";
import Layout from "../../layouts";
import Content from "../../layouts/content";
import SEO from "../../components/seo";
import SideBarSetting from "./component/sidebarSetting";
import GeneralSetting from "./component/GeneralSetting";
import PaymentSetting from "./component/PaymentSetting";
import WebsiteSetting from "./component/WebsiteSetting";
import PageHeader from "../../components/page-header";

interface ParamVar {
    pagetype: string;
}

const AccountSetting: React.FC = () => {
    const { pagetype } = useParams<ParamVar>();
    let page = <GeneralSetting />;
    if (pagetype === "general") {
        page = <GeneralSetting />;
    } else if (pagetype === "payment") {
        page = <PaymentSetting />;
    } else if (pagetype === "website") {
        page = <WebsiteSetting />;
    }
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
                <Media display={["block", null, null, "flex"]}>
                    <SideBarSetting />
                    <MediaBody
                        mt={["40px", null, null, 0]}
                        px={[null, null, null, "10px"]}
                    >
                        {page}
                    </MediaBody>
                </Media>
            </Content>
        </Layout>
    );
};

export default AccountSetting;
