import * as React from "react";
import { SessionRepository } from "../repository/session";
import { AuthContext } from "./_app";
import { UserRepository } from "../repository/user";
import { PostRepository } from "../repository/post";

export default () => {
  const auth = React.useContext(AuthContext);
  const [content, setContent] = React.useState("");
  const [posts, setPosts] = React.useState<{ content: string }[]>([]);
  console.log(posts);
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
      <h2>auth</h2>
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
      <h2>post contents</h2>
      {auth.uid ? (
        <div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!auth.uid) {
                alert("認証情報がありません");
                return;
              }
              await PostRepository.createPost(auth.uid, content);
              setContent("");
            }}
          >
            <label htmlFor="contents" style={{ display: "block" }}>
              contents
            </label>
            <textarea
              rows={30}
              cols={80}
              id="contents"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
            <input type="submit"></input>
          </form>
        </div>
      ) : (
        "投稿する為にはログインが必須です。"
      )}
      <h2>get contents</h2>
      <h3>noramal data</h3>
      <button
        onClick={async () => {
          const posts = await PostRepository.getAllPosts();
          setPosts(posts);
        }}
      >
        取得する為にはここをクリックしてね
      </button>
      {posts.map((post) => (
        <div>{post.content}</div>
      ))}
      <h3>reactive data</h3>
      <p>postすると自動で取得できるよ</p>
    </div>
  );
};
