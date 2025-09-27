import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebook,
  faYoutube,
  faLine,
} from '@fortawesome/free-brands-svg-icons';
import BannerList from './BannerList';

function Footer() {
  return (
    <footer>
      <div className='mx-auto my-10 max-w-[1500px] px-5'>
        <BannerList />
      </div>
      <div className='bg-black text-white'>
        <div className='mx-auto flex max-w-[1500px] flex-col justify-between px-10 pt-6 pb-10'>
          <div className='flex gap-10 border-b border-gray-500 pb-2'>
            <Link className='hover:opacity-80' to='/privacy'>
              個人情報の取り扱いについて
            </Link>
            <Link className='hover:opacity-80' to='/faq'>
              よくある質問
            </Link>
            <Link className='hover:opacity-80' to='/contact'>
              お問い合わせ
            </Link>
            <Link className='hover:opacity-80' to='/policies/terms-of-service'>
              利用規約
            </Link>
            <Link className='hover:opacity-80' to='/policies/refund-policy'>
              返金ポリシー
            </Link>
          </div>
          <div className='mt-10 text-center'>
            <div className='flex justify-center gap-4 pb-4 text-2xl'>
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
