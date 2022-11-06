function onLoaded() {
  document.addEventListener('scroll', function () {
    var scrollTop = document.documentElement.scrollTop;

    if (scrollTop > 10) {
      document.querySelector('header').classList.add('scrolled');
    } else {
      document.querySelector('header').classList.remove('scrolled');
    }
  });
}

document.addEventListener('DOMContentLoaded', onLoaded);
