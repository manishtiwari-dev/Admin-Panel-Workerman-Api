import React from "react";
import {
    Edit3,
    User,
    HelpCircle,
    LifeBuoy,
    Settings,
    LogOut,
} from "react-feather";
import {
    DropdownToggle,
    Dropdown,
    Avatar,
    AvatarInitial,
} from "@doar/components";
import { useAppSelector } from "../../../redux/hooks";
import {
    StyledDropMenu,
    StyledAuthorName,
    StyledAuthorRole,
    StyledDropItem,
    StyledDivider,
    StyledAvatar,
} from "./style";

const ProfileDropdown: React.FC = () => {
    const { name, role, apiToken } = useAppSelector((state) => state.login);

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

                {apiToken === null ? (
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
                        <StyledDropItem path="/signin" mt="10px">
                            <LogOut size="24" />
                            Sign Out
                        </StyledDropItem>
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
                <StyledDropItem path="/profile-view" mt="10px">
                    <Settings size="24" />
                    Account Settings
                </StyledDropItem>
                <StyledDropItem path="/profile-view" mt="10px">
                    <Settings size="24" />
                    Privacy Settings
                </StyledDropItem>
            </StyledDropMenu>
        </Dropdown>
    );
};

export default ProfileDropdown;
