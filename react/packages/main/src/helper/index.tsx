import React from "react";
import { useAppSelector } from "../redux/hooks";

interface CheckInfo {
    IsPageAccess: string;
}

const CheckPermission: React.FC<any> = ({ ...props }) => {
    const { children, IsPageAccess } = props;
    const { role, permission } = useAppSelector((state) => state.login);
    if (role === "superadmin" || role === "admin") {
        return <>{children}</>;
    }
    const permissionList = JSON.parse(permission);
    if (permissionList !== null) {
        if (permissionList.length > 0) {
            if (permissionList.includes(IsPageAccess)) {
                return <>{children}</>;
            }
        }
    }
    return null;
};

export default CheckPermission;
