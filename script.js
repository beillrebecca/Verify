document.addEventListener("DOMContentLoaded", () => {
  const type = sessionStorage.getItem("verificationType");

  const codeInput = document.getElementById("code");
  const codeMessage = document.getElementById("codeMessage");
  const emailMessage = document.getElementById("emailMessage");
  const resend = document.getElementById("resendCode");
  const verifyBtn = document.getElementById("verifyBtn");

  // 🔥 表示切り替え
  if (type === "email") {
    codeInput.style.display = "none";
    codeMessage.style.display = "none";
    resend.style.display = "none";
  } else {
    emailMessage.style.display = "none";
  }

  verifyBtn.addEventListener("click", () => {
    const user = firebase.auth().currentUser;

    // メール認証
    if (type === "email") {
      if (!user) {
        alert("ログインしてください");
        return;
      }

      user.reload().then(() => {
        if (user.emailVerified) {
          alert("認証完了！");
          window.location.href = "/Login/index.html";
        } else {
          alert("まだメール認証が完了していません");
        }
      });
    }

    // 電話番号認証
    if (type === "phone") {
      const code = codeInput.value.trim();

      if (!code) {
        alert("コードを入力してください");
        return;
      }

      window.confirmationResult.confirm(code)
        .then(() => {
          alert("認証完了！");
          window.location.href = "/Login/index.html";
        })
        .catch(() => {
          alert("コードが違います");
        });
    }
  });
});