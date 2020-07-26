import Firebase from "../infra/Firebase";

export const SessionRepository = {
  loginAnonymous: async (): Promise<string> => {
    try {
      const userCredential = await Firebase.instance.auth.signInAnonymously();
      return userCredential.user.uid;
    } catch (e) {
      console.error(e);
      throw new Error("login失敗した");
    }
  },
  checkAlreadyLogin: ({
    successHandle,
    errorHanle,
  }: {
    successHandle: (userId: string) => void;
    errorHanle: () => void;
  }): void => {
    Firebase.instance.auth.onAuthStateChanged((user) => {
      if (user) {
        successHandle(user.uid);
      } else {
        errorHanle();
      }
    });
  },
  logout: () => {
    Firebase.instance.auth.signOut();
  },
  delete: () => {
    Firebase.instance.auth.currentUser.delete();
  },
};
