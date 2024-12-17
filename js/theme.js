const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

function toggleIcon() {
  if (
    localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    // Show light icon and hide dark icon
    return themeToggleLightIcon.classList.remove('hidden');
  } else {
    // Show dark icon and hide light icon
    return themeToggleDarkIcon.classList.remove('hidden');
  }
}

function toggleMode() {
  themeToggleDarkIcon.classList.toggle('hidden');
  themeToggleLightIcon.classList.toggle('hidden');

  // If is set in localstorage
  if (localStorage.getItem('color-theme')) {
    // If light, make dark and save in localstorage
    if (localStorage.getItem('color-theme') === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      // If dark, make light and save in localstorage
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }
  } else {
    // If not in localstorage
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
  }
}

toggleIcon();

themeToggleBtn.addEventListener('click', toggleMode);
