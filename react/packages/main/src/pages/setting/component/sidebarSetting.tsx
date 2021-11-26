import { FC } from "react";
import { Link } from "react-router-dom";
import { Globe } from "react-feather";
import { StyledItem } from "./style";

const SideBarSetting: FC = () => {
    return (
        <>
            <ul>
                <StyledItem>
                    <Globe width={18} height={18} strokeWidth="2.3px" />
                    <Link
                        to="/setting/general"
                        color="text2"
                        className="current"
                    >
                        General setting
                    </Link>
                </StyledItem>
                <StyledItem>
                    <Globe width={18} height={18} strokeWidth="2.3px" />
                    <Link
                        to="/setting/payment"
                        color="text2"
                        className="active"
                    >
                        Payment setting
                    </Link>
                </StyledItem>
                <StyledItem>
                    <Globe width={18} height={18} strokeWidth="2.3px" />
                    <Link
                        to="/setting/website"
                        color="text2"
                        className="active"
                    >
                        Website setting
                    </Link>
                </StyledItem>
            </ul>
        </>
    );
};

export default SideBarSetting;
