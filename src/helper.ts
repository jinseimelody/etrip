
export const strIncludes = (src: string, dest: string) => {
  const removeSign = (str: string) => {
    const vSign = [
      'aAeEoOuUiIdDyY',
      'áàạảãâấầậẩẫăắằặẳẵ',
      'ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ',
      'éèẹẻẽêếềệểễ',
      'ÉÈẸẺẼÊẾỀỆỂỄ',
      'óòọỏõôốồộổỗơớờợởỡ',
      'ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ',
      'úùụủũưứừựửữ',
      'ÚÙỤỦŨƯỨỪỰỬỮ',
      'íìịỉĩ',
      'ÍÌỊỈĨ',
      'đ',
      'Đ',
      'ýỳỵỷỹ',
      'ÝỲỴỶỸ'
    ];

    let result = '';
    for (let i = 0; i < str.length; i++) {
      const index = vSign.findIndex(x => x.includes(str[i]));
      if (index > 0) {
        result += vSign[0][index - 1];
      } else {
        result += str[i];
      }
    }
    return result;
  };

  const result = removeSign(src)
    .toLocaleLowerCase()
    .includes(removeSign(dest).toLocaleLowerCase());
  return result;
};
