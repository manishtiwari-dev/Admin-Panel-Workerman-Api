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
    userUrl,
    editUserUrl,
    updateUserUrl,
    deleteUserUrl,
} from "../../config";
import { useAppSelector } from "../../redux/hooks";
import CreateUserForm from "./createUserForm";
import RoleOption from "../../components/user/RoleOption";
import CheckPermission from "../../helper";

interface Info {
    id: number;
    name: string;
    api_token: string;
    email: string;
    status: string;
    created_at: string;
    roles: [];
}
interface FormData {
    name: string;
    email: string;
    api_token: string;
    password: string;
    role_name: string;
}
interface RolesInfo {
    id: number;
    name: string;
    display_name: string;
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
        setValue,
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
                if (status) SetUserList(data.data);
                else alert(message);
            })
            .catch((error) => {
                alert("Something went wrong !");
                console.error("There was an error!", error);
            });
    };
    const toggleCreateClass = () => {
        const editElement = document.getElementsByClassName(
            "editUserCreateForm"
        );
        if (editElement.length > 0) {
            editElement[0].classList.remove("show");
            editElement[0].classList.add("hide");
        }
        const elements = document.getElementsByClassName("userCreateForm");
        if (elements[0].classList.toggle("show")) setColSize(8);
        else setColSize(12);
    };
    const editUser = (userID: number) => {
        const addUserelements = document.getElementsByClassName(
            "userCreateForm"
        );
        addUserelements[0].classList.remove("show");
        addUserelements[0].classList.add("hide");
        const editData = {
            api_token: apiToken,
            updateId: userID,
        };
        axios
            .post(editUserUrl, editData)
            .then((response: AxiosResponse) => {
                console.log(response);
                const { status, data, message } = response.data;
                if (status) {
                    const elements = document.getElementsByClassName(
                        "editUserCreateForm"
                    );
                    elements[0].classList.add("show");
                    setColSize(8);
                    const { name, email } = data;
                    setValue("updatedId", data.id);
                    setValue("name", name);
                    setValue("email", email);
                    setValue("role_name", data.role_name);
                    setValue("status", data.status);
                } else {
                    alert(message);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const deleteUser = (userID: number) => {
        const editData = {
            api_token: apiToken,
            deleteId: userID,
        };
        axios
            .post(deleteUserUrl, editData)
            .then((response: AxiosResponse) => {
                console.log(response);
                const { message } = response.data;
                getUser();
                alert(message);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const updateUser = (updateData: FormData) => {
        console.log(updateData);
        const sendUpdateData = updateData;
        sendUpdateData.api_token = apiToken;
        axios
            .post(updateUserUrl, sendUpdateData)
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
                        <CheckPermission IsPageAccess="user.create">
                            <Row gutters={10} mb="20px">
                                <Button
                                    type="button"
                                    color="brand2"
                                    onClick={toggleCreateClass}
                                >
                                    Create user
                                </Button>
                            </Row>
                        </CheckPermission>
                        <CheckPermission IsPageAccess="user.view">
                            <Row gutters={10}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Role</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userlist &&
                                            userlist.map((list, index) => (
                                                <tr key={list.id + 1}>
                                                    <th scope="row">
                                                        {index + 1}
                                                    </th>
                                                    <td>{list.name}</td>
                                                    <td>{list.email}</td>
                                                    <td>
                                                        {list.roles.map(
                                                            (
                                                                rolesData: RolesInfo
                                                            ) => (
                                                                <span
                                                                    key={
                                                                        rolesData.id
                                                                    }
                                                                >
                                                                    {
                                                                        rolesData.display_name
                                                                    }
                                                                </span>
                                                            )
                                                        )}
                                                    </td>
                                                    <td>{list.status}</td>
                                                    <td>
                                                        <CheckPermission IsPageAccess="user.edit">
                                                            <Button
                                                                onClick={() =>
                                                                    editUser(
                                                                        list.id
                                                                    )
                                                                }
                                                            >
                                                                Edit
                                                            </Button>
                                                        </CheckPermission>
                                                        &nbsp;
                                                        <CheckPermission IsPageAccess="user.destroy">
                                                            <Button
                                                                onClick={() =>
                                                                    deleteUser(
                                                                        list.id
                                                                    )
                                                                }
                                                            >
                                                                Delete
                                                            </Button>
                                                        </CheckPermission>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </Table>
                            </Row>
                        </CheckPermission>
                    </Col>
                    <CheckPermission IsPageAccess="user.create">
                        <Col lg={4} className="userCreateForm hide">
                            <CreateUserForm getUser={() => getUser()} />
                        </Col>
                    </CheckPermission>
                    <CheckPermission IsPageAccess="user.edit">
                        <Col lg={4} className="editUserCreateForm hide">
                            <Card width={["100%", "100%"]}>
                                <CardHeader>
                                    <CardTitle as="h5">Edit User</CardTitle>
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
                                        onSubmit={handleSubmit(updateUser)}
                                        noValidate
                                    >
                                        <input
                                            {...register("updatedId")}
                                            type="hidden"
                                        />
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
                                                feedbackText={
                                                    errors?.name?.message
                                                }
                                                state={
                                                    hasKey(errors, "name")
                                                        ? "error"
                                                        : "success"
                                                }
                                                showState={
                                                    !!hasKey(errors, "name")
                                                }
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
                                                    required:
                                                        "Email is required",
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                        message:
                                                            "invalid email address",
                                                    },
                                                })}
                                                disabled
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
                                                <RoleOption />
                                            </select>
                                        </FormGroup>
                                        <FormGroup mb="20px">
                                            <Label
                                                display="block"
                                                mb="5px"
                                                htmlFor="status"
                                            >
                                                Status
                                            </Label>
                                            <select
                                                id="status"
                                                {...register("status")}
                                            >
                                                <option value="active">
                                                    Active
                                                </option>
                                                <option value="deactive">
                                                    Deactive
                                                </option>
                                            </select>
                                        </FormGroup>
                                        <Button
                                            type="submit"
                                            color="brand2"
                                            fullwidth
                                        >
                                            Update user
                                        </Button>
                                    </form>
                                </CardBody>
                            </Card>
                        </Col>
                    </CheckPermission>
                </Row>
            </Content>
        </Layout>
    );
};

export default Users;
