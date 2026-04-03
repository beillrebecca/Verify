// verify.js
document.addEventListener("DOMContentLoaded", () => {
  const type = sessionStorage.getItem("verificationType"); // 'email' or 'phone'
  const codeInput = document.getElementById("code");
  const codeMessage = document.getElementById("codeMessage");
  const emailMessage = document.getElementById("emailMessage");
  const resend = document.getElementById("resendCode");
  const verifyBtn = document.getElementById("verifyBtn");

  // ----------------------------
  // 表示切替
  // ----------------------------
  if (type === "email") {
    // メール認証はリンクをクリックするので、コード入力は非表示
    codeInput.style.display = "none";
    codeMessage.style.display = "none";
    resend.style.display = "none"; 
    emailMessage.style.display = "block";
  } else if (type === "phone") {
    // 電話番号認証はコード入力が必要
    codeInput.style.display = "block";
    codeMessage.style.display = "block";
    resend.style.display = "block";
    emailMessage.style.display = "none";
  }

  // ----------------------------
  // verify ボタンクリック
  // ----------------------------
  verifyBtn.addEventListener("click", async () => {

    if (type === "phone") {
      const code = codeInput.value.trim();
      if (!code) {
        alert("確認コードを入力してください");
        return;
      }

      if (!window.confirmationResult) {
        alert("確認コード送信情報が見つかりません。Signupページからやり直してください");
        return;
      }

      window.confirmationResult.confirm(code)
        .then(() => {
          alert("電話番号認証完了！ログイン可能です");
          window.location.href = "/Login/index.html";
        })
        .catch(() => {
          alert("コードが間違っています");
        });
    }

  });

  // ----------------------------
  // 再送ボタン（電話番号用）
  // ----------------------------
  if (resend) {
    resend.addEventListener("click", async () => {
      const phoneNumber = sessionStorage.getItem("phoneNumber");
      if (!phoneNumber) {
        alert("電話番号が見つかりません。Signupページからやり直してください");
        return;
      }

      try {
        const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
          size: 'invisible'
        });

        const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
        window.confirmationResult = confirmationResult;
        alert("確認コードを再送しました");
      } catch (error) {
        console.error(error);
        alert("再送信に失敗しました: " + error.message);
      }
    });
  }

});