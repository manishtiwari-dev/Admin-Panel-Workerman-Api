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
