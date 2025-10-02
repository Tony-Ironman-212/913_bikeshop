function RefundPolicy() {
  return (
    <div className='mx-auto max-w-[800px] px-3 py-5 lg:px-5'>
      <h1 className='mt-5 text-center text-3xl font-semibold'>返金ポリシー</h1>
      <div>
        <h2 className='text-xl font-semibold'>弊社事由の返品</h2>
        <div className='space-y-2 text-justify'>
          <p>
            商品および梱包、発送には万全を期しておりますが、万が一お届けした商品に不具合などがございましたら、
            下記カスタマーサービスまでご連絡ください。商品到着より10日以内に限り、送料弊社負担にて返品を承ります。
          </p>
        </div>
      </div>
      <div className='mt-6'>
        <h2 className='text-xl font-semibold'>お客様都合の返品</h2>
        <div className='space-y-2 text-justify'>
          <p>
            お客様のご都合による返品は、以下全てに該当する場合に限り送料お客様ご負担にて承ります。
            なお、サイズの交換はいたしかねますので、お手数ですがご返品後改めてご注文ください。
          </p>
          <ul className='list-disc pl-5'>
            <li>事前に返品する旨のご連絡があること</li>
            <li>商品到着後10日以内であること</li>
            <li>
              ご返送時の商品状態がお届け時と大きく異なっていないこと（箱・付属品を含む）
            </li>
            <li>お客様のもとで汚れ、キズが生じていないこと</li>
            <li>当サイトでご購入いただいた商品であること</li>
            <li>
              アウトレット品ではなく、かつ商品ページに返品不可の記載がないこと
            </li>
            <li>その他当社が不適当と認める事由がないこと</li>
          </ul>
          <p>
            ※バイク商品については、商品が弊社からご自宅等に発送された以降の変更、キャンセルはできません。
          </p>
        </div>
      </div>
      <div className='mt-6'>
        <h2 className='text-xl font-semibold'>返品の流れ</h2>
        <div className='space-y-2 text-justify'>
          <p>
            下記お電話またはお問い合わせフォームより、カスタマーサービスへ返品の旨ご連絡ください。
          </p>
          <div className='mt-3'>
            <p>【返送先】</p>
            <p>〒160-0023 東京都新宿区西新宿6丁目26−3</p>
            <p>スペシャライズドCPOカスタマーサポート</p>
            <p>info@specialized-cpo.com</p>
            <p>03-6258-5877</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RefundPolicy;
