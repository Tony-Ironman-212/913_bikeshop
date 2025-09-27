import { useState } from 'react';

// import cá nhân
import ContactInput from '../components/ContactInput';
import validateField from '../utils/validateField';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // state lưu lỗi cho từng trường
  const [fieldErrors, setFieldErrors] = useState({
    nameError: '',
    emailError: '',
    phoneNumberError: '',
    messageError: '',
  });

  // xử lý xuống hàng cho modal message
  const modalMessage = message.split('\n').map((line, index) => {
    return <p key={index}>{line}</p>;
  });

  // handle change cho từng trường
  const handleChange = (field, value, validateField, e) => {
    switch (field) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'message':
        setMessage(value);
        e.target.style.height = 'auto'; // reset height
        e.target.style.height = `${e.target.scrollHeight}px`; // set height theo scrollHeight

        break;
    }
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [field + 'Error']: validateField(field, value),
    }));
  };

  // handle blur cho từng trường
  const handleBlur = (field, value, validateField) => {
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [field + 'Error']: validateField(field, value),
    }));
  };

  // handle chặn submit default của form
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // handle chặn phím enter submit keydown enter
  const handleKeyDown = (e) => {
    if (e.target.tagName === 'TEXTAREA') return; // cho phép enter trong textarea
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  // handle submit form
  const handleSubmitForm = async () => {
    try {
      const response = await fetch('/api/contact-client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phoneNumber,
          inquiryType,
          message,
        }),
      });
      if (!response.ok) {
        throw new Error('サーバーエラーが発生しました');
      }
      const data = await response.json();
      console.log(data.message);
      alert(
        'お問い合わせありがとうございました。3営業日以内にご連絡いたします。'
      );
      setIsModalOpen(false);
      // reset form
      setName('');
      setEmail('');
      setPhoneNumber('');
      setMessage('');
    } catch (error) {
      alert('送信中にエラーが発生しました。もう一度お試しください。');
    }
  };

  const handleCancelSubmit = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className='relative h-[300px] overflow-hidden'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white'>
          <h1 className='text-[80px]/[80px] font-bold'>Contact us</h1>
          <h2 className='my-3 text-3xl font-bold'>--お問い合わせ--</h2>
        </div>
        <img
          className='h-full w-full object-cover'
          src='/img/contact_banner.webp'
          alt='banner'
        />
      </div>
      <div className='mx-auto mt-5 max-w-[800px] space-y-8 px-5 py-5'>
        <h1 className='text-center text-2xl font-medium text-gray-700'>
          お問い合わせフォーム
        </h1>
        <form
          action='#'
          method='POST'
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
        >
          <ContactInput
            label='お名前（フルネームでお願いいたします）'
            type='text'
            id='name'
            placeholder='山田太郎'
            value={name}
            onChange={(e) =>
              handleChange('name', e.target.value, validateField)
            }
            onBlur={() => {
              handleBlur('name', name, validateField);
            }}
            error={fieldErrors.nameError}
          />
          <ContactInput
            label='メールアドレス'
            type='email'
            id='email'
            placeholder='taro@example.com'
            value={email}
            onChange={(e) =>
              handleChange('email', e.target.value, validateField)
            }
            onBlur={() => {
              handleBlur('email', email, validateField);
            }}
            error={fieldErrors.emailError}
          />
          <ContactInput
            label='電話番号'
            type='text'
            id='phone-number'
            placeholder='09012345678'
            value={phoneNumber}
            onChange={(e) =>
              handleChange('phoneNumber', e.target.value, validateField)
            }
            onBlur={() => {
              handleBlur('phoneNumber', phoneNumber, validateField);
            }}
            error={fieldErrors.phoneNumberError}
          />
          <fieldset className='my-5 flex flex-col'>
            <label htmlFor='inquiry-type'>お問い合わせ内容</label>
            <select
              className='border border-gray-300 p-2 text-gray-800'
              name='inquiry-type'
              id='inquiry-type'
              value={inquiryType}
              onChange={(e) => setInquiryType(e.target.value)}
            >
              <option className='text-gray-400' value=''>
                --お問い合わせ内容を選択してください--
              </option>
              <option value='商品について'>商品について</option>
              <option value='購入方法について'>購入方法について</option>
              <option value='買取について'>買取について</option>
              <option value='店舗について'>店舗について</option>
              <option value='その他について'>その他について</option>
            </select>
          </fieldset>
          <fieldset className='my-5 flex flex-col'>
            <label htmlFor='message'>
              メッセージ<span className='text-red-500'>*</span>
            </label>

            <textarea
              className='min-h-[150px] border border-gray-300 p-2 text-gray-800'
              name='message'
              id='message'
              placeholder='メッセージを入力してください'
              value={message}
              style={{ overflow: 'hidden' }}
              rows={1}
              onChange={(e) =>
                handleChange('message', e.target.value, validateField, e)
              }
              onBlur={() => {
                handleBlur('message', message, validateField);
              }}
            ></textarea>
            {fieldErrors.messageError && (
              <span className='text-[12px] text-red-500'>
                {fieldErrors.messageError}
              </span>
            )}
          </fieldset>

          <button
            className='w-full rounded bg-[var(--color-primary)] p-2 text-white disabled:opacity-50'
            type='button'
            disabled={
              Object.values(fieldErrors).some((error) => error !== '') ||
              !name ||
              !email ||
              !phoneNumber ||
              !message
            }
            onClick={() => setIsModalOpen(true)}
          >
            送信
          </button>
        </form>
        <p>
          このサイトはhCaptchaによって保護されており、hCaptchaプライバシーポリシーおよび利用規約が適用されます。
        </p>
      </div>

      {/* modal xác nhận */}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/50'>
          <div className='w-[500px] rounded bg-white p-5'>
            <h2 className='text-center text-xl font-bold'>確認</h2>
            <p className='mb-4 text-center'>↓以下の内容でお問い合わせします↓</p>
            <ul className='space-y-1'>
              <li>
                名前: <span className='font-semibold'>{name}</span>
              </li>
              <li>
                Email: <span className='font-semibold'>{email}</span>
              </li>
              <li>
                電話番号: <span className='font-semibold'>{phoneNumber}</span>
              </li>
              <li>
                お問い合わせ内容:{' '}
                <span className='font-semibold'>{inquiryType || '未選択'}</span>
              </li>
              <li>
                メッセージ:{' '}
                <span className='font-semibold'>{modalMessage}</span>
              </li>
            </ul>
            <div className='mt-5 flex justify-center gap-5'>
              <button
                className='w-full rounded bg-gray-200 p-2 text-black'
                onClick={handleCancelSubmit}
              >
                キャンセル
              </button>
              <button
                className='w-full rounded bg-[var(--color-primary)] p-2 text-white'
                onClick={handleSubmitForm}
              >
                確定する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact;
