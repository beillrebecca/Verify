// Firebase 初期化
const firebaseConfig = {
  apiKey: "AIzaSyCo1YZczL9GYsYkW4L2XBEM-SBWRvEUUUo",
  authDomain: "recomen-91703.firebaseapp.com",
  projectId: "recomen-91703",
  storageBucket: "recomen-91703.appspot.com",
  messagingSenderId: "361705732453",
  appId: "1:361705732453:web:54b7c1113e687baa5a098c"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const verifyBtn = document.getElementById("verifyBtn");
const resendCode = document.getElementById("resendCode");
const codeInput = document.getElementById("code");

// ===== ページ読み込み時にメール認証か電話番号認証かを判定 =====
let verificationType = sessionStorage.getItem("verificationType"); // "email" or "phone"

// ===== 認証ボタンクリック =====
verifyBtn.addEventListener("click", async () => {
  if (verificationType === "email") {
    const user = auth.currentUser;
    if (user) {
      await user.reload(); // 最新情報を取得
      if (user.emailVerified) {
        alert("メール認証完了！ログインページへ進みます。");
        window.location.href = "../Login/";
      } else {
        alert("メール認証が完了していません。メールのリンクを確認してください。");
      }
    } else {
      alert("ユーザーが見つかりません。もう一度ログインしてください。");
    }
  } else if (verificationType === "phone") {
    const code = codeInput.value.trim();
    if (!code) {
      alert("確認コードを入力してください");
      return;
    }
    try {
      await window.confirmationResult.confirm(code);
      alert("電話番号認証完了！ログインページへ進みます。");
      window.location.href = "../Login/";
    } catch (error) {
      console.error(error);
      alert("確認コードが正しくありません: " + error.message);
    }
  } else {
    alert("認証タイプが設定されていません。Signup からやり直してください。");
  }
});

// ===== 再送信ボタン =====
resendCode.addEventListener("click", () => {
  if (verificationType === "phone" && window.confirmationResult) {
    const phone = sessionStorage.getItem("phoneNumber");
    const appVerifier = window.recaptchaVerifier;
    auth.signInWithPhoneNumber(phone, appVerifier)
      .then(result => {
        window.confirmationResult = result;
        alert("確認コードを再送信しました");
      })
      .catch(error => {
        console.error(error);
        alert("SMS再送信エラー: " + error.message);
      });
  } else {
    alert("再送信は電話番号認証のみ可能です");
  }
});