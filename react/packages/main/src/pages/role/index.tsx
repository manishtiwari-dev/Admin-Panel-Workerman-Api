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
import { roleUrl, editRoleUrl, updateRoleUrl } from "../../config";
import { useAppSelector } from "../../redux/hooks";
import CreateRoleForm from "./create";
import PermissionCheckbox from "../../components/user/PermissionCheckbox";

interface Per {
    id: number;
    name: string;
}
interface Info {
    id: number;
    name: string;
    display_name: string;
    permissions: [];
}
interface FormData {
    name: string;
    permission_name: any;
    api_token: string;
}

const Roles: React.FC = () => {
    const { apiToken } = useAppSelector((state) => state.login);
    const [rolelist, SetRoleList] = useState<Info[]>([]);
    const [editRoleData, SeteditRoleData] = useState<Info[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();
    const [msgType, setMsgType] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const getRoles = () => {
        const formData = {
            api_token: apiToken,
        };
        axios
            .post(roleUrl, formData)
            .then((response: AxiosResponse) => {
                console.log(response);
                const { status, data, message } = response.data;
                if (status) SetRoleList(data);
                else alert(message);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    };
    const editRole = (roleID: number) => {
        const addUserelements = document.getElementsByClassName(
            "userCreateForm"
        );
        addUserelements[0].classList.add("hide");
        const editData = {
            api_token: apiToken,
            updateId: roleID,
        };
        axios
            .post(editRoleUrl, editData)
            .then((response: AxiosResponse) => {
                console.log(response);
                const { status, data, message } = response.data;
                if (status) {
                    const elements = document.getElementsByClassName(
                        "editUserCreateForm"
                    );
                    elements[0].classList.add("show");
                    setValue("updatedId", data.id);
                    setValue("role_name", data.display_name);
                } else {
                    alert(message);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const onSubmit = (formData: FormData) => {
        console.log(formData);
        const checkedList = document.querySelectorAll<HTMLInputElement>(
            'input[name="editpermissionList"]:checked'
        );
        console.log(checkedList.length);
        if (checkedList.length === 0) {
            console.log("working");
            setMsgType("error");
            setErrorMsg("Please check any permission");
        } else {
            const permissionArr = [];
            for (let i = 0; i < checkedList.length; i += 1) {
                permissionArr.push(checkedList[i].value);
            }
            const saveFormData = formData;
            saveFormData.api_token = apiToken;
            saveFormData.permission_name = permissionArr;
            console.log(saveFormData);
            axios
                .post(updateRoleUrl, saveFormData)
                .then((response: AxiosResponse) => {
                    console.log(response);
                    const { status, data, message } = response.data;
                    if (status) {
                        getRoles();
                        setMsgType("success");
                        setErrorMsg(message);
                    } else {
                        console.log(message);
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
        }
    };
    useEffect(() => {
        getRoles();
    }, []);

    return (
        <Layout>
            <SEO />
            <Content borderBottomWidth="1px">
                <PageHeader
                    prev={[{ text: "Dashboard", link: "/" }]}
                    title="Roles"
                    wcText="Role List"
                />
            </Content>
            <Content mt={[null, null, null, "0px"]}>
                <Row>
                    <Col lg={8}>
                        <Row gutters={10}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Roles</th>
                                        <th scope="col">Permission</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rolelist &&
                                        rolelist.map((list, index) => (
                                            <tr key={list.id + 1}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{list.display_name}</td>
                                                <td>
                                                    {list.permissions.map(
                                                        (pers: Per) => (
                                                            <span key={pers.id}>
                                                                {pers.name}
                                                                ,&nbsp;
                                                            </span>
                                                        )
                                                    )}
                                                </td>
                                                <td>
                                                    <Button
                                                        onClick={() =>
                                                            editRole(list.id)
                                                        }
                                                    >
                                                        Edit
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                        </Row>
                    </Col>
                    <Col lg={4} className="userCreateForm">
                        <CreateRoleForm getRoles={() => getRoles()} />
                    </Col>
                    <Col lg={4} className="editUserCreateForm hide">
                        <Card width={["100%", "100%"]}>
                            <CardHeader>
                                <CardTitle as="h5">Edit Role</CardTitle>
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
                                            Role Name
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
                                            {...register("role_name", {
                                                required:
                                                    "Role Name is required",
                                            })}
                                        />
                                    </FormGroup>
                                    <FormGroup mb="20px">
                                        <Label
                                            display="block"
                                            mb="5px"
                                            htmlFor="permissionList"
                                        >
                                            Permission List
                                        </Label>
                                        <PermissionCheckbox Compname="editpermissionList" />
                                    </FormGroup>
                                    <Button
                                        type="submit"
                                        color="brand2"
                                        fullwidth
                                    >
                                        Update Role
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

export default Roles;
