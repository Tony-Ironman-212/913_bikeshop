import Banner from './Banner';

function BannerList() {
  return (
    <div className='mt-12 flex flex-col gap-4'>
      <Banner
        link='/collections/bike'
        title='ROAD BIKE'
        subtitle='ロードバイク'
        imgSrc='/img/bike_banner.webp'
      />
      <Banner
        link='/collections/frame'
        title='FRAME'
        subtitle='フレーム'
        imgSrc='/img/frame_banner.webp'
      />
      <Banner
        link='/collections/wheel'
        title='WHEEL'
        subtitle='ホイール'
        imgSrc='/img/wheel_banner.webp'
      />
    </div>
  );
}

export default BannerList;
