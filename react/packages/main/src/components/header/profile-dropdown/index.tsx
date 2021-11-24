import React from "react";
import { User, HelpCircle, LifeBuoy, Settings, LogOut } from "react-feather";
import {
    DropdownToggle,
    Dropdown,
    Avatar,
    AvatarInitial,
    Button,
} from "@doar/components";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { logoutState } from "../../../redux/slices/login";
import {
    StyledDropMenu,
    StyledAuthorName,
    StyledAuthorRole,
    StyledDropItem,
    StyledDivider,
    StyledAvatar,
} from "./style";
import CheckPermission from "src/helper";

const ProfileDropdown: React.FC = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const { name, role, isAuthenticated } = useAppSelector(
        (state) => state.login
    );
    const { handleSubmit } = useForm();
    /* logout function */
    const logoutUser = () => {
        dispatch(logoutState());
        history.push("/signin");
    };
    return (
        <Dropdown direction="down" className="dropdown-profile">
            <DropdownToggle variant="texted">
                <StyledAvatar size="sm" shape="circle">
                    <AvatarInitial>df</AvatarInitial>
                </StyledAvatar>
            </DropdownToggle>
            <StyledDropMenu>
                <Avatar size="lg" shape="circle">
                    <AvatarInitial>
                        {name === null ? "Guest" : name}
                    </AvatarInitial>
                </Avatar>
                <StyledAuthorName>
                    {name === null ? "Guest" : name}
                </StyledAuthorName>
                <StyledAuthorRole>
                    {role === null ? "Guest" : role}
                </StyledAuthorRole>

                {isAuthenticated === false ? (
                    <StyledDropItem path="/signin" mt="10px">
                        <LogOut size="24" />
                        Sign In
                    </StyledDropItem>
                ) : (
                    <>
                        <StyledDropItem path="/profile-view" mt="10px">
                            <User size="24" />
                            View Profile
                        </StyledDropItem>
                        <Button
                            color="primary"
                            variant="texted"
                            mt="10px"
                            onClick={handleSubmit(logoutUser)}
                        >
                            <LogOut size="15" />
                            Sign Out
                        </Button>
                    </>
                )}
                <StyledDivider />
                <StyledDropItem
                    path="https://hasthemes.com/contact-us/"
                    mt="10px"
                >
                    <HelpCircle size="24" />
                    Help Center
                </StyledDropItem>
                <StyledDropItem path="/" mt="10px">
                    <LifeBuoy size="24" />
                    Forum
                </StyledDropItem>
                <CheckPermission IsPageAccess="setting.update">
                    <StyledDropItem path="/setting" mt="10px">
                        <Settings size="24" />
                        Account Settings
                    </StyledDropItem>
                </CheckPermission>

                <StyledDropItem path="/profile-view" mt="10px">
                    <Settings size="24" />
                    Privacy Settings
                </StyledDropItem>
            </StyledDropMenu>
        </Dropdown>
    );
};

export default ProfileDropdown;
