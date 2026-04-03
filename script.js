document.addEventListener("DOMContentLoaded", () => {
  const type = sessionStorage.getItem("verificationType");
  const verifyBtn = document.getElementById("verifyBtn");

  verifyBtn.addEventListener("click", async () => {
    if (type === "email") {
      const user = firebase.auth().currentUser;
      if (!user) return alert("ログインしてください");

      await user.reload();
      if (user.emailVerified) {
        alert("メール認証完了！ログイン可能です");
        window.location.href = "/Login/index.html";
      } else {
        alert("まだメール認証が完了していません。メール内リンクをクリックしてください。");
      }
    }

    if (type === "phone") {
      const codeInput = document.getElementById("code").value.trim();
      if (!codeInput) return alert("コードを入力してください");

      window.confirmationResult.confirm(codeInput)
        .then(() => {
          alert("電話番号認証完了！");
          window.location.href = "/Login/index.html";
        })
        .catch(() => alert("コードが違います"));
    }
  });
});