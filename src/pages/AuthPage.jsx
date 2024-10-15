import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './../firebase/config'

const AuthPage = ({setIsAuth}) => {


  // giriş yap butonuna tıklanınca
  const handleClick = () => {
    signInWithPopup(auth,provider)
    .then((res) => {
      // oturumun açık olduğunu uygulamada yönetmek için local'e tokenini kaydet
      localStorage.setItem("TOKEN" , res.user.refreshToken);
    
      // kullanıcının yetkisini true a çeks
      setIsAuth(true)
    })
    .catch((err) => console.log(err))
  };

  return (
    <div className="container">
      <div className="auth">
        <h1>Chat Odası</h1>
        <p> Devam etmek için giriş yapın</p>
        <button onClick={handleClick}>
          <img src="/public/g-logo.png" />
          <span>Google ile gir</span>
        </button>
        </div>
    </div>
  )
}

export default AuthPage