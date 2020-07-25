import * as React from "react";
import { SessionRepository } from "../repository/session";
import { AuthContext } from "./_app";
import { UserRepository } from "../repository/user";

export default () => {
  const auth = React.useContext(AuthContext);
  React.useEffect(() => {
    SessionRepository.checkAlreadyLogin({
      successHandle: (userId: string) => {
        auth.setUid(userId);
      },
      errorHanle: () => {
        auth.setUid(null);
      },
    });
  }, []);
  return (
    <div>
      {auth.uid ? (
        <div>
          <p> userId: ${auth.uid}</p>
          <button
            onClick={async () => {
              await SessionRepository.logout();
            }}
          >
            ログアウト
          </button>
        </div>
      ) : (
        <button
          onClick={async () => {
            const userId = await SessionRepository.loginAnonymous();
            UserRepository.createAnonymouseUser(userId);
          }}
        >
          匿名ログイン
        </button>
      )}
    </div>
  );
};
