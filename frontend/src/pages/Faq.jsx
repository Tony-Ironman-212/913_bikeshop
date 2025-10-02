import FaqItem from '../components/FaqItem';

function Faq() {
  const salesFaq = [
    {
      question: '現物を見ることは可能でしょうか？',
      answer:
        'はい、可能です。商品をご指定の上、ご来店予約をお願いいたします。',
    },
    {
      question: '試乗は可能でしょうか？',
      answer:
        '大変、申し訳ございませんが承っておりません。ただ、店内で跨って頂く事は可能です。',
    },
    {
      question: '店頭納車は可能でしょうか？',
      answer: 'はい、可能です。ご注文後にご来店予約をお願いいたします。',
    },
    {
      question: 'お取り置きは可能でしょうか？',
      answer:
        '全て１点モノとなります為、大変、申し訳ございませんがお取り置きは承っておりません。',
    },
    {
      question: '配送の運送会社はどちらになりますでしょうか？',
      answer:
        'セイノースーパーエイクスプレス、佐川急便等の宅配便での配送となります。お客様に運送会社の指定を頂く事は承っておりません。',
    },
    {
      question: '配送の日時指定は可能でしょうか？',
      answer:
        '特殊な大型便での配送となります為、お日にち指定は可能ですが時間指定は不可となります。また、地域によって土日祝の配送が難しい場合がございますのでご了承くださいませ。',
    },
    {
      question: '譲渡証明書の発行は可能でしょうか？',
      answer:
        '大変、申し訳ございませんが承っておりません。ただ、店内で跨って頂く事は可能です。',
    },
    {
      question: '試乗は可能でしょうか？',
      answer:
        'はい、販売する全てのバイクに譲渡証明書及び保証書をお付けいたします。',
    },
  ];
  const bringInFaq = [
    {
      question: '査定はどのくらい時間がかかりますか？',
      answer:
        'ロードバイク1台ですとおおよそ20分程度となります。 混雑状況や商品の点数によってはお時間頂く場合がございます。 かなりお時間を頂く場合は事前にご案内いたします。',
    },
    {
      question: '店舗まで乗って行ってそのまま売却も可能ですか？',
      answer:
        '可能です。お着替えやヘルメット、ビンディングシューズを店舗からご自宅に郵送する事も可能です。',
    },
    {
      question: '検討したいのでしばらく預かって貰う事は可能ですか？',
      answer: '基本的には3営業日以内でのご判断をお願いいたします。',
    },
    {
      question: '持ち込み品の中で一部キャンセルは可能ですか？',
      answer:
        '可能です。複数点の場合は個別の買取金額をお伝えする事も可能ですのでご検討くださいませ。',
    },
    {
      question: '販売している商品を購入する場合、下取りも可能ですか？',
      answer:
        '大歓迎です。下取り売却をご希望の商品のお持ち込みが必須となります。',
    },
  ];
  const auditFaq = [
    {
      question: 'すぐに振り込みしてもらえますか？',
      answer:
        '買取の承諾を頂いてから最短翌日、1-2営業日以内にお振込み致します。',
    },
    {
      question: '現金でもらえますか？',
      answer:
        '宅配買取の場合はご指定口座へのお振込みとなります。店舗へお持込みの場合は現金でのお支払いも可能ですが、買取金額が10万円以上の場合は仮査定時に「現金での買取希望」とお申し付けくださいませ。',
    },
  ];
  const onSiteFaq = [
    {
      question: 'どこまで来てもらえますか？対応エリアを教えてください。',
      answer:
        '関東、関西、東海、北九州エリアが対象となります。基本的には店舗より車で片道30分以内は出張費無料となりますが、買取金額によっては圏外の地域でも無料となります。是非お気軽にご相談くださいませ。※提携店のスタッフがお伺いする場合がございます。',
    },
    {
      question: '大量にお願いしたいのですが可能でしょうか？',
      answer:
        '大歓迎です！過去には4tトラックでお伺いした事もございます。お気軽にご相談くださいませ。',
    },
    {
      question: '今日か明日、すぐに来てもらうことは可能でしょうか？',
      answer:
        '出張査定のご予約状況により対応可能でございます。お気軽にご相談下さいませ。',
    },
    {
      question: '自宅以外の場所にも買取に来て貰えますか？',
      answer:
        'ロードバイクを保管されている倉庫や職場等へのご訪問可能です。ご自宅の玄関前や車庫、マンションのエントランスや駐輪場でも対応可能でございます。',
    },
    {
      question: '現金買取も可能でしょうか？',
      answer:
        'セキュリティーの都合上、基本的にご指定口座へのお振込での対応となります。（基本的には当日中、遅くとも翌日にはお振込み手続きいたします）現金での買取をご希望の場合は前日までにお知らせくださいませ。',
    },
    {
      question: '曜日や時間帯の指定も出来ますか？',
      answer:
        '夜間や早朝など、できるだけ柔軟に対応いたしますのでご希望をお知らせくださいませ。',
    },
    {
      question: '出張買取に来て貰ってからのキャンセルは可能でしょうか？',
      answer:
        '本査定の買取金額が仮査定の範囲内のキャンセルの場合はキャンセル料（5000円）が発生いたします。 仮査定額を下回った場合は無料でキャンセルが可能です。',
    },
    {
      question: '買取希望のバイク以外のバイクも査定だけして欲しいのですが',
      answer:
        'もちろん可能です。 現物での査定となりますので正確な買取金額を算出いたします。',
    },
  ];
  const otherFaq = [
    {
      question: '駐車場はありますか？',
      answer:
        '店舗前に1台分駐車スペースがございます。事前予約制となりますのでコチラよりご予約をお願いいたします。',
    },
    {
      question:
        'タイアップやコラボレーション、メディアへの露出を依頼したいです。',
      answer: 'お問い合せフォームよりご相談ください',
    },
    {
      question: '求人募集は行なっていますか？',
      answer:
        'はい、実施しております。お問い合わせフォームよりご相談くださいませ。',
    },
  ];
  return (
    <div>
      <div className='relative h-[300px] overflow-hidden'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white'>
          <h1 className='text-[80px]/[80px] font-bold'>FAQ</h1>
          <h2 className='my-3 text-3xl font-semibold'>--よくある質問--</h2>
        </div>
        <img
          className='h-full w-full object-cover object-[50%_63%]'
          src='/img/faq_banner.webp'
          alt='banner'
        />
      </div>
      <div className='mx-auto mt-5 max-w-[1000px] space-y-8 px-3 py-5 lg:px-5'>
        <div>
          <h1 className='text-2xl font-bold'>販売について</h1>
          <div className='mt-5 flex flex-col space-y-4'>
            {salesFaq.map((item, index) => (
              <FaqItem
                key={index}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
        <div>
          <h1 className='text-2xl font-bold'>持込買取について</h1>
          <div className='mt-5 flex flex-col space-y-4'>
            {bringInFaq.map((item, index) => (
              <FaqItem
                key={index}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
        <div>
          <h1 className='text-2xl font-bold'>査定金額のご入金について</h1>
          <div className='mt-5 flex flex-col space-y-4'>
            {auditFaq.map((item, index) => (
              <FaqItem
                key={index}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
        <div>
          <h1 className='text-2xl font-bold'>出張買取について</h1>
          <div className='mt-5 flex flex-col space-y-4'>
            {onSiteFaq.map((item, index) => (
              <FaqItem
                key={index}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
        <div>
          <h1 className='text-2xl font-bold'>その他</h1>
          <div className='mt-5 flex flex-col space-y-4'>
            {otherFaq.map((item, index) => (
              <FaqItem
                key={index}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
