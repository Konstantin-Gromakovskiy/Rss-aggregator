const errors = {
  exists: 'RSS уже существует',
  required: 'Не должно быть пустым',
  notUrl: 'Ссылка должна быть валидным URL',
  notRss: 'Ресурс не содержит валидный RSS',
  network: 'Ошибка сети',
  unknown: 'Неизвестная ошибка. Что-то пошло не так.',
};

const otherText = {
  success: 'RSS успешно загружен',
};

const translation = { ...errors, ...otherText };

export default { translation };
