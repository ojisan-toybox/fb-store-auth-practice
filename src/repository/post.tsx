import Firebase from "../infra/Firebase";

export const PostRepository = {
  createPost: async (userId: string, content: string): Promise<void> => {
    try {
      const userRef = Firebase.instance.db.collection("user").doc(userId);
      Firebase.instance.db
        .collection("post")
        .add({
          content,
          userRef,
        })
        .catch((e) => {
          throw new Error(e);
        });
    } catch (e) {
      console.error(e);
      throw new Error("user登録に失敗した");
    }
  },
  getAllPosts: async (): Promise<{ content: string }[]> => {
    const snapshot = await Firebase.instance.db.collection("post").get();
    const data = snapshot.docs;
    return data.map((d) => ({ content: d.data().content }));
  },
};
