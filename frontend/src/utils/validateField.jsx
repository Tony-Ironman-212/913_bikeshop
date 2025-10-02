// validate chung cho tất cả các trường
const validateField = (field, value, password) => {
  switch (field) {
    case 'lastName':
      return value.trim() === '' ? '姓を入力してください' : '';
    case 'firstName':
      return value.trim() === '' ? '名を入力してください' : '';
    case 'name':
      return value.trim() === '' ? '名前を入力してください' : '';
    case 'phoneNumber':
      return value.trim() === '' ? '電話番号を入力してください' : '';
    case 'message':
      return value.trim() === '' ? 'メッセージを入力してください' : '';
    case 'email':
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      return !emailRegex.test(value) ? '有効なEmailを入力してください' : '';
    case 'password':
      return value.length < 6
        ? 'パスワードは6文字以上である必要があります'
        : '';
    case 'passwordCheck':
      return value !== password ? 'パスワードが一致しません' : '';
    case 'agreement':
      return !value ? '利用規約に同意する必要があります' : '';
    case 'zipCode':
      return value.trim() === '' ? '郵便番号を入力してください' : '';
    case 'address':
      return value.trim() === '' ? '住所を入力してください' : '';
  }
};

export default validateField;
