import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebook,
  faYoutube,
  faLine,
} from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer>
      <div className='bg-black text-white'>
        <div className='mx-auto flex max-w-[1500px] justify-between px-10 pt-6 pb-10'>
          <div className='flex flex-col gap-1'>
            <Link to='/privacy'>個人情報の取り扱いについて</Link>
            <Link to='/faq'>よくある質問</Link>
            <Link to='/contact'>お問い合わせ</Link>
            <Link to='/policies/terms-of-service'>利用規約</Link>
            <Link to='/policies/refund-policy'>返金ポリシー</Link>
          </div>
          <div className='text-right'>
            <div className='flex justify-end gap-4 pb-4 text-2xl'>
              <button>
                <FontAwesomeIcon icon={faInstagram} />
              </button>
              <button>
                <FontAwesomeIcon icon={faFacebook} />
              </button>
              <button>
                <FontAwesomeIcon icon={faYoutube} />
              </button>
              <button>
                <FontAwesomeIcon icon={faLine} />
              </button>
            </div>
            <p>© 2025 スペシャライズドCPOオンラインストア</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
