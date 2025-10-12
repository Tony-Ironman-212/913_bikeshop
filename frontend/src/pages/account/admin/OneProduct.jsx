// trang cập nhật chi tiết một sản phẩm
// A. Backend:
// tạo api để lấy chi tiết sản phẩm GET /api/products/id/:id, lấy luôn isDeleted
// tạo api để cập nhật sản phẩm PATCH /api/products/:id, xóa mềm cũng là api này

// B. Frontend:
// chuẩn bị. những thứ hiển nhiên sẽ bỏ qua, chuẩn bị những phần đặc biệt sau
// useParams để lấy id từ url
// ContactInput để lấy tạo thẻ input sửa nội dung.
// ValidateField để validate dữ liệu nhập vào

// Những việc cần làm.
// -call api 1 sản phẩm theo id, lấy giá trị đó gán cho các trường input.
// -tách chức năng gọi api riêng, để dùng trong useEffect và khi submit form
// -các function cần có: fetchProduct, handleSubmit, handleKeyDown, handleChange, handleBlur, handleSubmitForm, handleCancelSubmit, handleClickUpdate.

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// import cá nhân
import ContactInput from '../../../components/ContactInput';
import validateField from '../../../utils/validateField';

function OneProduct() {
  // láy id từ param
  const { id } = useParams();

  // tạo biến product rồi đi call api gán giá trị cho biến này
  const [product, setProduct] = useState(null);

  // tất cả các biến cho form
  const [type, setType] = useState('bike');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(1);
  const [imageUrls, setImageUrls] = useState([]);
  const [description, setDescription] = useState({
    year: '',
    size: '',
    weight: '',
    condition: '',
  });
  const [sizeInfo, setSizeInfo] = useState({ topTube: '', seatTube: '' });
  const [specInfo, setSpecInfo] = useState({ group: '', wheel: '' });
  const [isDeleted, setIsDeleted] = useState(false);

  // state lưu lỗi cho từng trường
  const [fieldErrors, setFieldErrors] = useState({
    productNameError: '',
    priceError: '',
    stockError: '',
  });

  // state modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // tạo hàm call api, chạy nó trong useEffect
  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/admin/${id}`
      );
      if (!response.ok) {
        throw new Error('network not ok');
      }
      const data = await response.json();
      setProduct(data);
      setType(data.type);
      setName(data.name);
      setPrice(data.price);
      setStock(data.stock);
      setImageUrls(data.images);
      setDescription({
        year: data.description.year,
        size: data.description.size,
        weight: data.description.weight,
        condition: data.description.condition,
      });
      setSizeInfo(data.description.sizeInfo);
      setSpecInfo(data.description.specInfo);
      setIsDeleted(data.isDeleted);
    } catch (err) {
      console.error('error fetch product' + err);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [id]);

  // xử lý handleChange và handleBlur
  const handleChange = (field, value, validateField) => {
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
      [`${field}Error`]: validateField(field, value),
    }));
  };

  const handleBlur = (field, value, validateField) => {
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [`${field}Error`]: validateField(field, value),
    }));
  };

  // console.log('product', product);
  // console.log('type', type);
  // console.log('name', name);
  // console.log('price', price);
  // console.log('stock', stock);
  // console.log('imageUrls', imageUrls);
  // console.log('description', description);
  // console.log('sizeInfo', sizeInfo);
  // console.log('specInfo', specInfo);
  // console.log('isDeleted', isDeleted);

  // handle cancel submit
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
          sizeInfo,
          specInfo,
        },
        isDeleted,
      };
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('network not ok');
      }
      const data = await response.json();
      console.log('Updated product:', data);
      alert('商品情報を更新しました');
      setIsModalOpen(false);
    } catch (err) {
      console.error('error update product', err);
    }
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

  if (!product) {
    return <div className='text-center'>Loading...</div>;
  }

  return (
    <div className='mx-auto mt-8 mb-20 max-w-[800px]'>
      <h1 className='text-center text-2xl font-bold'>一つの商品詳細ページ</h1>
      <form
        action=''
        className='mt-4 space-y-4'
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
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
            <option value='bike'>バイク</option>
            <option value='frame'>フレーム</option>
            <option value='ホイール'>ホイール</option>
          </select>
        </fieldset>
        <ContactInput
          id='name'
          label='商品名'
          type='text'
          placeholder='S-work Tarmac SL7'
          value={name}
          onChange={(e) =>
            handleChange('productName', e.target.value, validateField)
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
          onChange={(e) => handleChange('price', e.target.value, validateField)}
          onBlur={(e) => handleBlur('price', e.target.value, validateField)}
          error={fieldErrors.priceError}
        />
        <ContactInput
          id='stock'
          label='在庫'
          type='text'
          placeholder='1'
          value={stock}
          onChange={(e) => handleChange('stock', e.target.value, validateField)}
          onBlur={(e) => handleBlur('stock', e.target.value, validateField)}
          error={fieldErrors.stockError}
        />
        <fieldset>
          <label htmlFor='images'>Images Urls</label>
          <textarea
            name='images'
            id='images'
            className='h-30 w-full border border-gray-300 p-1'
            value={imageUrls.join('\n')}
            onChange={(e) => setImageUrls(e.target.value.split('\n'))}
          ></textarea>
        </fieldset>

        {/* description */}
        <h1>商品の説明</h1>
        <ContactInput
          id='year'
          label='年式'
          type='text'
          placeholder='2025年'
          hideRedStar={true}
          value={description.year}
          onChange={(e) =>
            setDescription({ ...description, year: e.target.value })
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
            setDescription({ ...description, size: e.target.value })
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
            setDescription({ ...description, weight: e.target.value })
          }
        />
        <fieldset>
          <label htmlFor='condition'>状態</label>
          <textarea
            name='condition'
            id='condition'
            className='h-30 w-full border border-gray-300 p-1'
            value={description.condition.join('\n')}
            onChange={(e) =>
              setDescription({
                ...description,
                condition: e.target.value.split('\n'),
              })
            }
          ></textarea>
        </fieldset>

        {/* size info */}
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
          placeholder='530mm'
          hideRedStar={true}
          value={sizeInfo.seatTube}
          onChange={(e) =>
            setSizeInfo({ ...sizeInfo, seatTube: e.target.value })
          }
        />

        {/* Spec info */}
        <h1>スペック詳細</h1>
        <ContactInput
          id='group'
          label='グループセット'
          type='text'
          placeholder='Shimano 105'
          hideRedStar={true}
          value={specInfo.group}
          onChange={(e) => setSpecInfo({ ...specInfo, group: e.target.value })}
        />
        <ContactInput
          id='wheel'
          label='ホイール'
          type='text'
          placeholder='Roval CLX 50'
          hideRedStar={true}
          value={specInfo.wheel}
          onChange={(e) => setSpecInfo({ ...specInfo, wheel: e.target.value })}
        />

        {/* tick để xóa mềm */}
        <fieldset>
          <label htmlFor='delete'>商品を非表示にする</label>
          <input
            type='checkbox'
            id='delete'
            className='ml-2 h-4 w-4'
            checked={isDeleted}
            onChange={(e) => setIsDeleted(e.target.checked)}
          />
        </fieldset>

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
          商品の情報を更新する
        </button>
      </form>

      {/* modal */}
      {isModalOpen && (
        <div className='fixed inset-0 z-10 flex items-center justify-center bg-black/50'>
          <div className='w-[400px] rounded bg-white p-3 lg:w-[500px] lg:p-5'>
            <h2 className='text-center text-xl font-bold'>確認</h2>
            <p className='mb-4 text-center'>↓以下の内容で商品を更新する↓</p>
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
                {description.condition.map((item, index) => (
                  <p key={index} className='font-semibold'>
                    - {item}
                  </p>
                ))}
              </li>
              <li>
                商品を非表示にする:{' '}
                <span className='font-semibold'>
                  {isDeleted ? 'はい' : 'いいえ'}
                </span>
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

export default OneProduct;
