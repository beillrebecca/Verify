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
    codeInput.style.display = "block";       // メールもコード入力表示
    codeMessage.style.display = "block";
    resend.style.display = "block";          // コード再送ボタン表示
    emailMessage.style.display = "none";
  } else if (type === "phone") {
    codeInput.style.display = "block";
    codeMessage.style.display = "block";
    emailMessage.style.display = "block";
    resend.style.display = "block";
  }

  // ----------------------------
  // verify ボタンクリック
  // ----------------------------
  verifyBtn.addEventListener("click", () => {

    // ----------------------------
    // メール認証 (コード入力)
    // ----------------------------
    if (type === "email") {
      const code = codeInput.value.trim();
      const uid = sessionStorage.getItem("signupUid"); // signup で保存しておく

      if (!code) {
        alert("確認コードを入力してください");
        return;
      }

      fetch('/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, code })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('メール認証完了！ログイン可能です');
          window.location.href = "/Login/index.html";
        } else {
          alert(data.message);
        }
      })
      .catch(() => alert("通信エラーが発生しました"));
    }

    // ----------------------------
    // 電話番号認証
    // ----------------------------
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

  // ----------------------------
  // 再送ボタン
  // ----------------------------
  if (resend) {
    resend.addEventListener("click", () => {
      const uid = sessionStorage.getItem("signupUid");
      if (!uid) return alert("ユーザー情報がありません");

      fetch('/resend-verification', { // サーバー側でメール再送処理
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, type })
      })
      .then(res => res.json())
      .then(data => {
        if(data.success){
          alert("確認コードを再送しました");
        } else {
          alert("再送に失敗しました");
        }
      })
      .catch(() => alert("通信エラーが発生しました"));
    });
  }

});