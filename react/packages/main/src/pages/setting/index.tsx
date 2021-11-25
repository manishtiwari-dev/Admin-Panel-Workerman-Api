import React from "react";
import { Media, MediaBody } from "@doar/components";
import Layout from "../../layouts";
import Content from "../../layouts/content";
import SEO from "../../components/seo";
import SideBarSetting from "./component/sidebarSetting";
import WebsiteSetting from "./component/websiteSetting";
import PageHeader from "../../components/page-header";

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
                <Media display={["block", null, null, "flex"]}>
                    <SideBarSetting />
                    <MediaBody
                        mt={["40px", null, null, 0]}
                        px={[null, null, null, "10px"]}
                    >
                        <WebsiteSetting />
                    </MediaBody>
                </Media>
            </Content>
        </Layout>
    );
};

export default AccountSetting;
