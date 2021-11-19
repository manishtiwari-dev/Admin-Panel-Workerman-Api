import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Link } from "react-router-dom";
import { Row, Col, Table } from "@doar/components";
import Layout from "../../layouts";
import Content from "../../layouts/content";
import PageHeader from "../../components/page-header";
import Sidebar from "../../containers/groups/sidebar";
import SEO from "../../components/seo";
import { userUrl } from "../../config";
import { useAppSelector } from "../../redux/hooks";

interface Info {
    id: number;
    name: string;
    api_token: string;
    email: string;
    status: string;
    created_at: string;
}

const Users: React.FC = () => {
    const { apiToken } = useAppSelector((state) => state.login);
    const [userlist, SetUserList] = useState<Info[]>([]);
    useEffect(() => {
        const formData = {
            api_token: apiToken,
        };
        axios
            .post(userUrl, formData)
            .then((response: AxiosResponse) => {
                console.log(response);
                const { status, data, message } = response.data;
                if (status) SetUserList(data);
                else alert(message);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    }, []);
    return (
        <Layout>
            <SEO />
            <Content borderBottomWidth="1px">
                <PageHeader
                    prev={[{ text: "Dashboard", link: "/" }]}
                    title="Users"
                    wcText="User List"
                />
            </Content>
            <Content mt={[null, null, null, "0px"]}>
                <Row>
                    <Col lg={12}>
                        <Row gutters={10}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">User type</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userlist &&
                                        userlist.map((list, index) => (
                                            <tr key={list.id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{list.name}</td>
                                                <td>{list.email}</td>
                                                <td>{list.status}</td>
                                                <td>{list.status}</td>
                                                <td>
                                                    <Link
                                                        to={`/user/${list.id}`}
                                                    >
                                                        Edit
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                        </Row>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default Users;
