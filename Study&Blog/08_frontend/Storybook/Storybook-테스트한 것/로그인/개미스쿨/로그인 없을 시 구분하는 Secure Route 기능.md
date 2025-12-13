
- 출처 : 개미스쿨
```jsx
import { ComponentProps, createElement, FC } from "react";
import { Redirect, Route } from "react-router-dom";
import { getAccessToken } from "@/src/lib/jwt";

const SecureRoute: FC<ComponentProps<typeof Route>> = ({ component = "div", ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!!getAccessToken()) {
          return createElement(component);
        }
        // 엑세스 토큰이 없으면 로그인 화면으로 리다이렉트
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default SecureRoute;

```