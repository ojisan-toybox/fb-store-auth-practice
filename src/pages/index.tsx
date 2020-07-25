import * as React from "react";
import { SessionRepository } from "../repository/session";
import { AuthContext } from "./_app";

export default () => {
  const auth = React.useContext(AuthContext);
  React.useEffect(() => {
    SessionRepository.checkAlreadyLogin({
      successHandle: (userId: string) => {
        auth.setUid(userId);
      },
      errorHanle: () => {
        alert("認証チェックに失敗しました。");
      },
    });
  }, []);
  return (
    <div>
      {auth.uid ? (
        `userId: ${auth.uid}`
      ) : (
        <button onClick={() => SessionRepository.loginAnonymous()}>
          login
        </button>
      )}
    </div>
  );
};
