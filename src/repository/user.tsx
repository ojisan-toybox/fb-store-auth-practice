import Firebase from "../infra/Firebase";

export const UserRepository = {
  createAnonymouseUser: async (userId: string): Promise<void> => {
    try {
      Firebase.instance.db
        .collection("user")
        .doc(userId)
        .set({
          name: "匿名さん",
        })
        .catch((e) => {
          throw new Error(e);
        });
    } catch (e) {
      console.error(e);
      throw new Error("user登録に失敗した");
    }
  },
};
