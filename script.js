document.addEventListener("DOMContentLoaded", () => {
  const verifyBtn = document.getElementById("verifyBtn");

  verifyBtn.addEventListener("click", () => {
    const user = firebase.auth().currentUser;

    if (!user) {
      alert("ログイン情報がありません。もう一度登録してください。");
      return;
    }

    // 最新情報に更新
    user.reload().then(() => {
      if (user.emailVerified) {
        alert("認証完了！ログインページへ進みます。");
        location.href = "../Login/";
      } else {
        alert("まだ認証されていません。メールのリンクを確認してください。");
      }
    });
  });
});