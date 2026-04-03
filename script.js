document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.getElementById("signupBtn");

  signupBtn.addEventListener("click", () => {
    const contact = document.getElementById("contact").value.trim();
    const password = document.getElementById("password").value.trim();
    const passwordConfirm = document.getElementById("passwordConfirm").value.trim();

    if (!contact || !password || !passwordConfirm) {
      alert("全て入力してください");
      return;
    }

    if (password !== passwordConfirm) {
      alert("パスワードが一致しません");
      return;
    }

    // メール登録
    firebase.auth().createUserWithEmailAndPassword(contact, password)
      .then((userCredential) => {

        // 🔥 メール認証送信
        userCredential.user.sendEmailVerification()
          .then(() => {
            alert("確認メールを送信しました！");

            // 👇 ここがさっきのやつ
            location.href = "../Verify/index.html";
          });

      })
      .catch((error) => {
        console.error(error);
        alert("登録エラー: " + error.message);
      });
  });
});