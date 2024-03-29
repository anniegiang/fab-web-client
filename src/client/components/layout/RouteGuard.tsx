import {
  useState,
  useEffect,
  useContext,
  useCallback,
  ReactElement
} from "react";
import {useRouter} from "next/router";
import AuthContext from "client/context/AuthContext";
import {PATHS, PUBLIC_PATHS} from "constants/pages";

type Props = {
  children: ReactElement;
};

export default ({children}: Props) => {
  const router = useRouter();
  const {userid, accesstoken} = useContext(AuthContext);
  const [authorized, setAuthorized] = useState(false);

  const hideContent = useCallback(
    () => setAuthorized(false),
    [userid, accesstoken]
  );

  useEffect(() => {
    authCheck(router.asPath);

    router.events.on("routeChangeStart", hideContent);
    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, [userid, accesstoken]);

  const authCheck = useCallback(
    (url: string) => {
      const isLoggedIn = !!(userid && accesstoken);
      const path = url.split("?")[0];

      if (isLoggedIn && path === PATHS.login) {
        router.back();
        return;
      }

      if (!isLoggedIn && !PUBLIC_PATHS.includes(path)) {
        setAuthorized(false);
        router.push({pathname: PATHS.login});
      } else {
        setAuthorized(true);
      }
    },
    [userid, accesstoken]
  );

  return (authorized && children) || null;
};
