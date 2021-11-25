/* eslint-disable @typescript-eslint/no-unsafe-return */
import styled, { themeGet, tinycolor, device, css } from "@doar/shared/styled";
import { Card } from "@doar/components";

export const StyledItem = styled.li`
    display: flex;
    align-items: center;
    &:not(:first-of-type) {
        margin-top: 10px;
    }
    svg {
        color: ${themeGet("colors.shuttle2")};
        fill: ${(props) =>
            tinycolor(themeGet("colors.text2")(props))
                .setAlpha(0.06)
                .toRgbString()};
        margin-right: 15px;
    }
`;

export const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
    ${(props) =>
        props.theme.name === "dark" &&
        css`
            background-color: ${themeGet("colors.gray900")};
        `}
`;

export const StyledRole = styled.span`
    display: block;
    color: ${themeGet("colors.text3")};
    font-size: 13px;
`;

export const StyledTime = styled.span`
    font-size: 12px;
    color: ${themeGet("colors.text3")};
    align-self: flex-start;
    display: none;
    ${device.small} {
        display: block;
    }
`;

export const StyledGrayBox = styled.div`
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 15px;
    padding-bottom: 15px;
    border: 1px solid ${themeGet("colors.border")};
    background-color: ${themeGet("colors.gray50")};
    ${device.small} {
        padding-left: 20px;
        padding-right: 20px;
    }
    ${(props) =>
        props.theme.name === "dark" &&
        css`
            background-color: ${themeGet("colors.dark")};
        `}
`;
