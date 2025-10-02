import { Link } from 'react-router-dom';

function Privacy() {
  return (
    <div className='mx-auto max-w-[1000px] px-3 py-5 lg:px-5'>
      <p>
        <Link className='hover:underline' to='/'>
          Home
        </Link>{' '}
        / 個人情報の取り扱いについて
      </p>
      <h1 className='mt-5 text-center text-3xl font-semibold'>
        個人情報の取り扱いについて
      </h1>
      <p className='my-5 text-center text-xl'>
        株式会社 BAインターナショナル 個人情報保護に関する基本方針
      </p>
      <div>
        <h2 className='text-xl font-semibold'>個人情報保護について</h2>
        <p className='my-2 text-justify'>
          当サイトでは、お客様の個人情報は、弊社及びスペシャライズド・ジャパン合同会社における販売・買取に関する本人確認・
          連絡などの業務及び弊社における営業に関する各種情報提供サービスのみに
          利用させて頂きます。
          ダイレクトメール等の送付を希望されない場合は、お手数ではございますがご連絡をお願い致します。
        </p>
        <ul className='list-disc px-5 text-justify'>
          <li>お電話での連絡先：スペシャライズドCPO 03-6258-5877</li>
          <li>メールでの連絡先：お問い合せフォームよりお問い合せ下さい。</li>
        </ul>
      </div>
      <div className='mt-6'>
        <h2 className='text-xl font-semibold'>
          個人情報の第三者への開示・提供について
        </h2>
        <p className='my-2'>
          弊社では、法令に基づき、下記の場合を除きお客様の個人情報が第三者に
          提供されることはありません。
        </p>
        <ul className='list-disc px-5'>
          <li>法令に基づき裁判所や警察等の公的機関から要請があった場合。</li>
          <li>法令に特別の規定がある場合。</li>
          <li>
            お客様や第三者の生命・身体・財産を損なうおそれがあり、本人の同意を得ることができない場合
          </li>
          <li>
            法令や当社のご利用規約・注意事項に反する行動から、当社の権利
            、財産またはサービスを保護または防禦する必要があり、本人の同意を得る
            ことができない場合。
          </li>
          <li>
            お客様から当社の保有する個人情報に関し開示の請求を受けた場合は、ご本人からの請求であることが確認できた場合に限り開示します。
          </li>
        </ul>
      </div>
      <div className='mt-6'>
        <h2 className='text-xl font-semibold'>個人情報の安全性について</h2>
        <p className='my-2 text-justify'>
          お客様の個人情報には最大限の注意を払い厳重に管理されています。また個人情報
          の紛失、誤用、改変、外部アクセスを防止するために、セキュリティ対策を実施しておりま
          す。また個人情報保護法に従って必要な社内体制を整備し、従業員から個人情報の取扱を
          適正に行う旨の誓約書を取得します。
        </p>
      </div>
      <div className='mt-6'>
        <h2 className='text-xl font-semibold'>クッキーの設定について</h2>
        <p className='my-2 text-justify'>
          お客様は、クッキーの送受信に関する設定を「すべてのクッキーを許可する」、「すべてのクッキーを拒否する」、「クッキーを受信したらユーザーに通知する」などから選択できます。設定方法は、ブラウザにより異なります、クッキーに関する設定方法は、お使いのブラウザの「ヘルプ」メニューでご確認ください。
          すべてのクッキーを拒否する設定を選択されますと、認証が必要なサービスを受けられなくなる等、インターネット上の各種サービスの利用上、制約を受ける場合がありますのでご注意ください。
        </p>
      </div>
      <div className='mt-6'>
        <h2 className='text-xl font-semibold'>
          スペシャライズドCPOがクッキーを使用して行っていること
        </h2>
        <p className='my-2'>
          以下の目的のため、スペシャライズドCPOはクッキーを利用しています。
        </p>
        <ul className='list-disc px-5'>
          <li>
            お客様が興味を持っている内容や、スペシャライズドCPOのサイト上での利用状況をもとに、最も適切な広告を他社サイト上で表示するため。
          </li>
          <li>
            スペシャライズドCPOのサイトの利用者数やトラフィックを調査するため。
          </li>
          <li>スペシャライズドCPOのサービスを改善するため。</li>
        </ul>
      </div>
      <div className='my-6'>
        <h2 className='text-xl font-semibold'>個人情報の管理責任者</h2>
        <p className='my-2'>
          収集した個人情報についての管理責任は株式会社
          BAインターナショナルが負うものとします。
        </p>
      </div>
    </div>
  );
}

export default Privacy;
