(() => {
  const select = document.querySelector('[data-language-select]');
  if (!select) return;

  const storageKey = 'slideink-language';
  const currentLanguage = document.body.dataset.currentLanguage || 'en';

  try {
    const savedLanguage = localStorage.getItem(storageKey);
    const savedOption = [...select.options].find(option => option.dataset.language === savedLanguage);

    if (currentLanguage === 'en' && savedLanguage && savedLanguage !== 'en' && savedOption) {
      window.location.replace(savedOption.value);
      return;
    }

    localStorage.setItem(storageKey, currentLanguage);
  } catch (_) {
    // The selector still works when storage is unavailable.
  }

  select.addEventListener('change', event => {
    const option = event.target.selectedOptions[0];
    try {
      localStorage.setItem(storageKey, option.dataset.language);
    } catch (_) {
      // Navigation does not depend on storage.
    }
    window.location.assign(option.value);
  });
})();
