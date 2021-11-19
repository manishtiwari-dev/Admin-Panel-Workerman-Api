import { FC } from "react";
import { Redirect, Route } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const ProtectedRoute: FC<any> = ({
    component: Component,
    ...restOfProps
}: any) => {
    const { isAuthenticated } = useAppSelector((state) => state.login);
    console.log("this", isAuthenticated);
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
