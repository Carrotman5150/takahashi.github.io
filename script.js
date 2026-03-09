// script.js

// ページの読み込み完了時の処理
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('nav a');
  
  // スクロール時のヘッダースタイル変更
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // スクロール位置に基づくナビゲーションのアクティブ状態更新
    /* To be implemented with sections */
  };
  
  window.addEventListener('scroll', handleScroll);
  // 初期チェック
  handleScroll();
  
  // スムーススクロール
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // '#'だけの場合は無視
      if(this.getAttribute('href') === '#') return;
      
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
          
          // アクティブクラスの更新
          navLinks.forEach(nav => nav.classList.remove('active'));
          this.classList.add('active');
        }
      }
    });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // ページ読み込み時に初期アニメーション要素を取得（後で追加される要素用）
  const updateObservables = () => {
    document.querySelectorAll('.fade-in-up:not(.visible)').forEach(el => {
      observer.observe(el);
    });
  };
  
  updateObservables();
});
