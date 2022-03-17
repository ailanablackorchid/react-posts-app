import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthContext } from "../context";
import MyLoader from "./UI/loader/MyLoader";
import { privateRoutes, publicRoutes } from "../router/routes";

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <MyLoader />;
  }
  return (
    <Switch>
      {isAuth ? (
        <>
          {privateRoutes.map((route, index) => (
            <Route
              key={route.path}
              component={route.component}
              path={route.path}
              exact={route.exact}
            />
          ))}
          <Redirect to="/posts" />
        </>
      ) : (
        <>
          {publicRoutes.map((route, index) => (
            <Route
              key={route.path}
              component={route.component}
              path={route.path}
              exact={route.exact}
            />
          ))}
          <Redirect to="/login" />
        </>
      )}
    </Switch>
  );
};

export default AppRouter;
