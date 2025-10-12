import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  // call api lấy danh sách contacts cho admin
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // api lấy danh sách contacts theo thứ tự mới nhất là /api/contacts?sort=newest
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/contact-client?sort=newest`
        );

        if (!response.ok) {
          throw new Error('ネットワーク応答に問題があります');
        }
        const data = await response.json();
        console.log('Fetched contacts:', data);
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div>
      <h1 className='mb-6 text-center text-2xl font-bold'>
        お問い合わせ管理ページ
      </h1>
      {/* lg hiển thị dạng bảng */}
      <h1 className='mb-4 text-center text-lg font-semibold text-red-600 lg:hidden'>
        パソコン画面にてご確認ください。
      </h1>
      {contacts.map((contact) => {
        return (
          <div key={contact._id} className='mb-4 border-b pb-2'>
            <p>
              <strong>問い合わせID:</strong> {contact._id}
            </p>
            <p>
              <strong>名前:</strong> {contact.name}
            </p>
            <p>
              <strong>メール:</strong> {contact.email}
            </p>
            <p>
              <strong>電話番号:</strong> {contact.phoneNumber}
            </p>
            <p>
              <strong>問い合わせ内容:</strong> {contact.inquiryType}
            </p>
            <div>
              <strong>メッセージ:</strong> <br />
              <p>
                {contact.message.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Contacts;
