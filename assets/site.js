(() => {
  // Language picker. Only an explicit choice is remembered; visiting a localized page never
  // changes the saved language, so shared English links keep working for everyone else.
  const storageKey = 'slideink-language';
  const currentLanguage = document.body.dataset.currentLanguage || 'en';
  const selects = [...document.querySelectorAll('[data-language-select]')];

  let savedLanguage = null;
  try {
    savedLanguage = localStorage.getItem(storageKey);
  } catch (_) {
    // The picker still works when storage is unavailable.
  }

  if (currentLanguage === 'en' && savedLanguage && savedLanguage !== 'en' && selects.length) {
    const savedOption = [...selects[0].options].find(option => option.dataset.language === savedLanguage);
    if (savedOption) {
      window.location.replace(savedOption.value);
      return;
    }
  }

  const choose = select => {
    const option = select.selectedOptions[0];
    if (!option || option.dataset.language === currentLanguage) return;
    try {
      localStorage.setItem(storageKey, option.dataset.language);
    } catch (_) {
      // Navigation does not depend on storage.
    }
    window.location.assign(option.value);
  };

  const keepCurrent = select => {
    const current = [...select.options].find(option => option.dataset.language === currentLanguage);
    if (current) select.value = current.value;
  };

  selects.forEach(select => {
    // Arrow keys on a closed select fire "change"; with the keyboard the page only switches on Enter.
    let fromKeyboard = false;
    select.addEventListener('pointerdown', () => { fromKeyboard = false; });
    select.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        choose(select);
        return;
      }
      if (event.key !== 'Tab') fromKeyboard = true;
    });
    select.addEventListener('change', () => {
      if (!fromKeyboard) choose(select);
    });
    select.addEventListener('blur', () => keepCurrent(select));
  });

  // Mobile menu: close on a link tap, a tap outside, or Escape.
  const menus = [...document.querySelectorAll('[data-mobile-menu]')];
  menus.forEach(menu => {
    menu.addEventListener('click', event => {
      if (event.target.closest('a')) menu.open = false;
    });
  });
  document.addEventListener('click', event => {
    menus.forEach(menu => {
      if (menu.open && !menu.contains(event.target)) menu.open = false;
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    menus.forEach(menu => {
      if (!menu.open) return;
      menu.open = false;
      menu.querySelector('summary').focus();
    });
  });
})();
