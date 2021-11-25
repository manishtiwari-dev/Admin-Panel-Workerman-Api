import { FC } from "react";
import { Globe, GitHub, Twitter, Instagram, Facebook } from "react-feather";
import { Anchor } from "@doar/components";
import { StyledItem } from "./style";

const SideBarSetting: FC = () => {
    return (
        <>
            <ul>
                <StyledItem>
                    <Globe width={18} height={18} strokeWidth="2.3px" />
                    <Anchor color="text2" path="setting">
                        General setting
                    </Anchor>
                </StyledItem>
                <StyledItem>
                    <Globe width={18} height={18} strokeWidth="2.3px" />
                    <Anchor color="text2" path="setting">
                        Website setting
                    </Anchor>
                </StyledItem>
            </ul>
        </>
    );
};

export default SideBarSetting;
