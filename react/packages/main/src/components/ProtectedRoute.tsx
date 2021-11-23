import { FC, useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const ProtectedRoute: FC<any> = ({
    component: Component,
    ...restOfProps
}: any) => {
    const { isAuthenticated, permission, role } = useAppSelector(
        (state) => state.login
    );
    const [isPageAccess, setPageAccess] = useState(false);
    /* checking :  Is page access via role and permission */
    // useEffect(() => {
    //     if (role === "superadmin" || role === "admin") {
    //         setPageAccess(true);
    //     } else {
    //         const allPermission = JSON.parse(permission);
    //         console.log(restOfProps.path);
    //         if (allPermission.indexOf(restOfProps.path)) {
    //             setPageAccess(true);
    //         }
    //     }
    // }, []);

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/signin" />
                )
            }
        />
    );
};

export default ProtectedRoute;
