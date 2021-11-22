import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Link } from "react-router-dom";
import {
    Row,
    Col,
    Table,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Select,
    Button,
    Label,
    FormGroup,
    Input,
    Anchor,
    Text,
    Alert,
} from "@doar/components";
import { useForm } from "react-hook-form";
import { hasKey } from "@doar/shared/methods";
import Layout from "../../layouts";
import Content from "../../layouts/content";
import PageHeader from "../../components/page-header";
import Sidebar from "../../containers/groups/sidebar";
import SEO from "../../components/seo";
import { userUrl, createUserUrl } from "../../config";
import { useAppSelector } from "../../redux/hooks";

interface Info {
    id: number;
    name: string;
    api_token: string;
    email: string;
    status: string;
    created_at: string;
}
interface FormData {
    name: string;
    email: string;
    api_token: string;
    password: string;
    role_name: string;
}

const Users: React.FC = () => {
    const { apiToken } = useAppSelector((state) => state.login);
    const [colSize, setColSize] = useState(12);
    const [msgType, setMsgType] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [userlist, SetUserList] = useState<Info[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const getUser = () => {
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
                alert("Something went wrong !");
                console.error("There was an error!", error);
            });
    };
    const onSubmit = (formData: FormData) => {
        const saveFormData = formData;
        saveFormData.api_token = apiToken;
        axios
            .post(createUserUrl, saveFormData)
            .then((response: AxiosResponse) => {
                console.log(response);
                const { status, data, message } = response.data;
                if (status) {
                    getUser();
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
    const toggleCreateClass = () => {
        const elements = document.getElementsByClassName("userCreateForm");
        if (elements[0].classList.toggle("show")) setColSize(8);
        else setColSize(12);
    };

    useEffect(() => {
        getUser();
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
                    <Col lg={colSize}>
                        <Row gutters={10} mb="20px">
                            <Button
                                type="button"
                                color="brand2"
                                onClick={toggleCreateClass}
                            >
                                Create user
                            </Button>
                        </Row>
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
                                            <tr key={list.id + 1}>
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
                    <Col lg={4} className="userCreateForm hide">
                        <Card width={["100%", "100%"]}>
                            <CardHeader>
                                <CardTitle as="h5">Add User</CardTitle>
                            </CardHeader>
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
                                    noValidate
                                >
                                    <FormGroup mb="20px">
                                        <Label
                                            display="block"
                                            mb="5px"
                                            htmlFor="name"
                                        >
                                            User Name
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Enter your name"
                                            feedbackText={errors?.name?.message}
                                            state={
                                                hasKey(errors, "name")
                                                    ? "error"
                                                    : "success"
                                            }
                                            showState={!!hasKey(errors, "name")}
                                            {...register("name", {
                                                required:
                                                    "User Name is required",
                                            })}
                                        />
                                    </FormGroup>
                                    <FormGroup mb="20px">
                                        <Label
                                            display="block"
                                            mb="5px"
                                            htmlFor="email"
                                        >
                                            Email address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email address"
                                            state={
                                                hasKey(errors, "email")
                                                    ? "error"
                                                    : "success"
                                            }
                                            showState={
                                                !!hasKey(errors, "email")
                                            }
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                    message:
                                                        "invalid email address",
                                                },
                                            })}
                                        />
                                    </FormGroup>
                                    <FormGroup mb="20px">
                                        <Label
                                            display="block"
                                            mb="5px"
                                            htmlFor="password"
                                        >
                                            Password
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Enter your password"
                                            state={
                                                hasKey(errors, "password")
                                                    ? "error"
                                                    : "success"
                                            }
                                            showState={
                                                !!hasKey(errors, "password")
                                            }
                                            {...register("password", {
                                                required:
                                                    "Password is required",
                                                minLength: {
                                                    value: 6,
                                                    message:
                                                        "Minimum length is 6",
                                                },
                                            })}
                                        />
                                    </FormGroup>
                                    <FormGroup mb="20px">
                                        <Label
                                            display="block"
                                            mb="5px"
                                            htmlFor="role_name"
                                        >
                                            Role
                                        </Label>
                                        <select
                                            id="role_name"
                                            {...register("role_name", {
                                                required:
                                                    "Role name is required",
                                            })}
                                        >
                                            <option value="">
                                                Select role
                                            </option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </FormGroup>
                                    <Button
                                        type="submit"
                                        color="brand2"
                                        fullwidth
                                    >
                                        Create user
                                    </Button>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default Users;
