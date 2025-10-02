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
      <div className='mx-auto my-6 max-w-[1500px] px-3 lg:my-10 lg:px-5'>
        <BannerList />
      </div>
      <div className='bg-black text-white'>
        <div className='mx-auto flex max-w-[1500px] flex-col justify-between p-3 lg:px-10 lg:pt-6 lg:pb-10'>
          <div className='gap-10 space-y-1 border-b border-gray-500 pb-2 *:block lg:flex'>
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
          <div className='mt-4 text-center lg:mt-10'>
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
