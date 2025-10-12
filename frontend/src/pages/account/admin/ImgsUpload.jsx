import { useState, useEffect } from 'react';

// import cá nhân
import ContactInput from '../../../components/ContactInput';
import validateField from '../../../utils/validateField';

function ImagesUpload() {
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  // biến cho body data tạo product mới
  const [type, setType] = useState('bike');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(1); //list url ảnh lấy từ imageUrls OK
  const [description, setDescription] = useState({
    year: '',
    size: '',
    weight: '',
    condition: '',
  });
  const [conditionArray, setConditionArray] = useState([]);
  const [sizeInfo, setSizeInfo] = useState({ topTube: '', seatTube: '' });
  const [specInfo, setSpecInfo] = useState({ group: '', wheel: '' });

  // state lưu lỗi cho từng trường
  const [fieldErrors, setFieldErrors] = useState({
    productNameError: '',
    priceError: '',
    stockError: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // console.log(type, name, price, stock, description, sizeInfo, specInfo);

  // xử lý onChange input file
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };
  // xử lý upload ảnh
  const handleUploadImages = async () => {
    // cần lấy ra 1 mảng các ảnh để thành 1 formData
    // formData này sẽ gửi kèm trong body của request
    // call api gửi ảnh lên server để lấy link urls của ảnh
    if (images.length === 0) {
      alert('画像を選択してください');
      return;
    }

    // tạo formData rồi append các ảnh vào
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });

    // call api gửi formData lên để lấy imagesUrls
    try {
      setLoading(true); // Bắt đầu loading
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/upload/multiple`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('ネットワーク応答に問題があります');
      }
      const data = await response.json();
      alert('画像アップロード成功');
      setImages([]); // reset input file
      setImageUrls(data.imageUrls);
    } catch (error) {
      console.error('画像アップロードエラー:', error);
      alert('画像アップロードに失敗しました');
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  // handle change cho từng trường
  const handleChange = (field, value, validateField, e) => {
    switch (field) {
      case 'productName':
        setName(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'stock':
        setStock(value);
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

  useEffect(() => {
    const conditionArray = description.condition
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item !== '');
    setConditionArray(conditionArray);
  }, [description.condition]);

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

  const handleCancelSubmit = () => {
    setIsModalOpen(false);
  };

  // handle submit form
  const handleSubmitForm = async () => {
    try {
      const formData = {
        type,
        name,
        price: Number(price),
        stock: Number(stock),
        images: imageUrls,
        description: {
          ...description,
          condition: conditionArray,
          sizeInfo,
          specInfo,
        },
      };
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('ネットワーク応答に問題があります');
      }
      const data = await response.json();
      console.log('新しい商品作成成功:', data);

      alert('新しい商品が正常に作成されました！');
      setIsModalOpen(false);
      // reset form
      setType('bike');
      setName('');
      setPrice(0);
      setStock(1);
      setImages([]);
      setImageUrls([]);
      setDescription({
        year: '',
        size: '',
        weight: '',
        condition: '',
      });
      setSizeInfo({ topTube: '', seatTube: '' });
      setSpecInfo({ group: '', wheel: '' });
      setConditionArray([]);
    } catch (error) {
      alert('送信中にエラーが発生しました。もう一度お試しください。');
    }
  };

  return (
    <div>
      {/* Upload Images */}
      <div>
        <h1>画像アップロード</h1>
        <input
          className='rounded-md border border-gray-300 p-2'
          type='file'
          multiple
          onChange={(e) => handleFileChange(e)}
        />
        <button
          className='mt-2 rounded-md bg-blue-500 px-4 py-2 text-white'
          onClick={handleUploadImages}
        >
          アップロード
        </button>
        <div>
          <h1>Images Urls</h1>
          {loading && <p>アップロード中...</p>}
          <p>{imageUrls.join(', ')}</p>
        </div>
      </div>

      {/* tạo sản phẩm mới */}
      <div className='mx-auto mt-8 mb-20 max-w-[800px]'>
        <h1 className='text-center text-xl font-bold'>新しい商品を作成</h1>
        <form
          action='#'
          method='POST'
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          className='mt-4 space-y-4'
        >
          <fieldset>
            <label htmlFor='type'>タイプ</label>
            <select
              name='type'
              id='type'
              className='ml-2 border border-gray-300 p-1'
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value='bike'>自転車</option>
              <option value='frame'>フレーム</option>
              <option value='wheel'>ホイール</option>
            </select>
          </fieldset>
          <ContactInput
            id='name'
            label='商品名'
            type='text'
            placeholder='S-work Tarmac SL7'
            value={name}
            onChange={(e) =>
              handleChange('productName', e.target.value, validateField, e)
            }
            onBlur={(e) =>
              handleBlur('productName', e.target.value, validateField)
            }
            error={fieldErrors.productNameError}
          />
          <ContactInput
            id='price'
            label='価格'
            type='text'
            placeholder='400000'
            value={price}
            onChange={(e) =>
              handleChange('price', e.target.value, validateField, e)
            }
            onBlur={(e) => handleBlur('price', e.target.value, validateField)}
            error={fieldErrors.priceError}
          />
          <ContactInput
            id='stock'
            label='在庫'
            type='text'
            placeholder='1'
            value={stock}
            onChange={(e) =>
              handleChange('stock', e.target.value, validateField, e)
            }
            onBlur={(e) => handleBlur('stock', e.target.value, validateField)}
            error={fieldErrors.stockError}
          />

          <fieldset>
            <label htmlFor='images'>Images Urls</label>
            <textarea
              type='text'
              id='images'
              className='h-30 w-full border border-gray-300 p-1'
              value={imageUrls.join(', ')}
              readOnly
            />
          </fieldset>

          <h1 className='mt-10'>商品の説明</h1>
          <ContactInput
            id='year'
            label='年式'
            type='text'
            placeholder='2025年'
            hideRedStar={true}
            value={description.year}
            onChange={(e) =>
              setDescription({
                ...description,
                year: e.target.value,
              })
            }
          />
          <ContactInput
            id='size'
            label='サイズ'
            type='text'
            placeholder='49'
            hideRedStar={true}
            value={description.size}
            onChange={(e) =>
              setDescription({
                ...description,
                size: e.target.value,
              })
            }
          />
          <ContactInput
            id='weight'
            label='重量'
            type='text'
            placeholder='8.5kg'
            hideRedStar={true}
            value={description.weight}
            onChange={(e) =>
              setDescription({
                ...description,
                weight: e.target.value,
              })
            }
          />
          <fieldset>
            <label htmlFor='condition'>状態</label>
            <textarea
              type='text'
              id='condition'
              className='h-30 w-full border border-gray-300 p-1'
              value={description.condition}
              onChange={(e) =>
                setDescription({ ...description, condition: e.target.value })
              }
            />
          </fieldset>

          <h1>サイズ詳細</h1>
          <ContactInput
            id='topTube'
            label='トップチューブ'
            type='text'
            placeholder='530mm'
            hideRedStar={true}
            value={sizeInfo.topTube}
            onChange={(e) =>
              setSizeInfo({ ...sizeInfo, topTube: e.target.value })
            }
          />
          <ContactInput
            id='seatTube'
            label='シートチューブ'
            type='text'
            placeholder='515mm'
            hideRedStar={true}
            value={sizeInfo.seatTube}
            onChange={(e) =>
              setSizeInfo({ ...sizeInfo, seatTube: e.target.value })
            }
          />

          <h1>スペック詳細</h1>
          <ContactInput
            id='group'
            label='グループセット'
            type='text'
            placeholder='Shimano Ultegra R8000'
            hideRedStar={true}
            value={specInfo.group}
            onChange={(e) =>
              setSpecInfo({ ...specInfo, group: e.target.value })
            }
          />
          <ContactInput
            id='wheel'
            label='ホイール'
            type='text'
            placeholder='Roval CLX 50'
            hideRedStar={true}
            value={specInfo.wheel}
            onChange={(e) =>
              setSpecInfo({ ...specInfo, wheel: e.target.value })
            }
          />
          <button
            className='w-full rounded bg-[var(--color-primary)] p-2 text-white disabled:opacity-50'
            type='button'
            disabled={
              Object.values(fieldErrors).some((error) => error !== '') ||
              !name ||
              !price ||
              !stock
            }
            onClick={() => setIsModalOpen(true)}
          >
            新しい商品を作成する
          </button>
        </form>
      </div>

      {/* modal xác nhận */}
      {isModalOpen && (
        <div className='fixed inset-0 z-10 flex items-center justify-center bg-black/50'>
          <div className='w-[400px] rounded bg-white p-3 lg:w-[500px] lg:p-5'>
            <h2 className='text-center text-xl font-bold'>確認</h2>
            <p className='mb-4 text-center'>↓以下の内容で商品を作成する↓</p>
            <ul className='space-y-1'>
              <li>
                タイプ: <span className='font-semibold'>{type}</span>
              </li>
              <li>
                名前: <span className='font-semibold'>{name}</span>
              </li>
              <li>
                price:{' '}
                <span className='font-semibold'>
                  ¥{new Number(price).toLocaleString()}
                </span>
              </li>
              <li>
                在庫: <span className='font-semibold'>{stock}</span>
              </li>
              <li>
                Images Urls: <span className='font-semibold'>Images Urls</span>
              </li>
              <li>
                年式: <span className='font-semibold'>{description.year}</span>
              </li>
              <li>
                サイズ:{' '}
                <span className='font-semibold'>{description.size}</span>
              </li>
              <li>
                重量:{' '}
                <span className='font-semibold'>{description.weight}</span>
              </li>
              <li>
                トップチューブ:{' '}
                <span className='font-semibold'>{sizeInfo.topTube}</span>
              </li>
              <li>
                シートチューブ:{' '}
                <span className='font-semibold'>{sizeInfo.seatTube}</span>
              </li>
              <li>
                グループセット:{' '}
                <span className='font-semibold'>{specInfo.group}</span>
              </li>
              <li>
                ホイール:{' '}
                <span className='font-semibold'>{specInfo.wheel}</span>
              </li>
              <li>
                状態:{' '}
                {conditionArray.map((item, index) => (
                  <p key={index} className='font-semibold'>
                    - {item}
                  </p>
                ))}
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

export default ImagesUpload;
