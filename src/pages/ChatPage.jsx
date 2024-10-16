import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { useEffect, useState } from 'react';
import Message from '../components/Message';

const ChatPage = ({ room, setRoom }) => {
  const [messages, setMessages] = useState([]);

  // kollekisyonun referansını alma
  const messagesCol = collection(db, 'messages');

  // filtreleme ayarları oluştur
  const queryOptions = query(
    messagesCol,
    where('room', '==', room),
    orderBy('createdAt', 'asc')
  );

  // mesajı veritabanına ekle
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target[0].value;

    // veritbanaın yeni döküman ekler
    // 1: ekleme yapıcağımız kolleksiyonun referansı
    // 2: oluşturucağımzız döküman verileri
    await addDoc(messagesCol, {
      text,
      room,
      author: {
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });

    // formu sıfırlar
    e.target.reset();
  };

  // verilere abone ol
  useEffect(() => {
    // anlık oalrak kolleksiyondaki değişimleri izler
    // kolleksiyon her değiştiğind everidğimiz fonksiyonu çalıştırır
    const unsub = onSnapshot(queryOptions, (snapshot) => {
      // geçici oalrak mesajları tuutğumuz dizi
      const tempMsg = [];

      // docs tamamını döndük ve verilerini erişip geçici bir diziye aktardık
      snapshot.docs.forEach((doc) => tempMsg.push(doc.data()));

      // geçici dizideki verileri alıp state'e aktardık
      setMessages(tempMsg);
    });

    // kullanıcı bileşenden ayrılınca aboneliği sonlandır
    return () => unsub();
  }, []);

  return (
    <div className="chat-page">
      <header>
        <p>{auth?.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>

      <main>
        {messages.map((data, i) => (
          <Message data={data} key={i} />
        ))}
      </main>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="mesajınızı yazınız..."
        />
        <button>Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;