/*-----------------------------------------------------------------------------------
    Template Name: It's Me - HTML Template
    Template URI: https://webtend.net/demo/html/itsme/
    Author: WebTend
    Author URI:  https://webtend.net/
    Version: 1.0

    Note: This is Main JS File.
-----------------------------------------------------------------------------------
	CSS INDEX
	===================
    01. Nav & Slide
    02. Typed Text
    03. Counter Number
    04. Portfolio Carousel
    05. Testimonials Carousel
    06. Preloader
-----------------------------------------------------------------------------------*/

(function ($) {
  ('use strict');

  $(document).ready(function () {
    // 01. Nav & Slide
    $('.a-nav-toggle').on('click', function () {
      if ($('html').hasClass('body-menu-opened')) {
        $('html').removeClass('body-menu-opened').addClass('body-menu-close');
        $('.hide-menu').fadeOut();
      } else {
        $('html').addClass('body-menu-opened').removeClass('body-menu-close');
        $('.hide-menu').fadeIn();
      }
    });
    if ($('.a-pagepiling').length) {
      $('.a-pagepiling').pagepiling({
        scrollingSpeed: 280,
        menu: '#menu, #menuMain',
        anchors: ['About', 'Services', 'Skills', 'Resume', 'Portfolio', 'Testimonials', 'Weapons', 'Contact'],
        loopTop: false,
        loopBottom: false,
        navigation: {
          position: 'right',
        },
        onLeave: function () {
          $('.a-progressbar .progress-bar').each(function () {
            if ($('.slide-skills').hasClass('active')) {
              $(this).width($(this).attr('aria-valuenow') + '%');
            } else {
              $(this).width('0');
            }
          });
          typedText();
          countNumber();
        },
      });
    }

    // 02. Typed Text
    function typedText() {
      $('.a-slide-typed').each(function () {
        var thisSlide = $(this);
        if (thisSlide.hasClass('active')) {
          var typedDiv = '.a-typed-' + thisSlide.data('name');
          $(typedDiv).html('');
          var typedText = thisSlide.find('.a-typed').data('text');
          var typedT = new Typed(typedDiv, {
            strings: [typedText],
            typeSpeed: 60,
            startDelay: 1000,
            loop: false,
            showCursor: false,
          });
        }
      });
    }
    typedText();

    // 03. Counter Number
    function countNumber() {
      $('.slide-portfolio').each(function () {
        var thisSlide = $(this);
        if (thisSlide.hasClass('active')) {
          $('.success-box').each(function () {
            var $t = $(this),
              n = $t.find('.count-text').attr('data-stop'),
              r = parseInt($t.find('.count-text').attr('data-speed'), 10);
            if (!$t.hasClass('counted')) {
              $t.addClass('counted');
              $({
                countNum: $t.find('.count-text').text(),
              }).animate(
                {
                  countNum: n,
                },
                {
                  duration: r,
                  easing: 'linear',
                  step: function () {
                    $t.find('.count-text').text(Math.floor(this.countNum));
                  },
                  complete: function () {
                    $t.find('.count-text').text(this.countNum);
                  },
                }
              );
            }
          });
        }
      });
    }
    countNumber();

    // 04. Portfolio Carousel
    if ($('.portfolio-wrap').length) {
      $('.portfolio-wrap').slick({
        infinite: true,
        autoplay: false,
        arrows: false,
        dots: true,
        pauseOnHover: false,
        autoplaySpeed: 2000,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 776,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
    }

    // 05. Testimonials Carousel
    if ($('.testimonials-wrap').length) {
      $('.testimonials-wrap').slick({
        infinite: true,
        autoplay: false,
        arrows: false,
        dots: true,
        fade: true,
        pauseOnHover: false,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
      });
    }

    // 06. Share
    const facebookShare = document.getElementById('facebook-share');
    const twitterShare = document.getElementById('twitter-share');
    const whatsappShare = document.getElementById('whatsapp-share');
    const instagramShare = document.getElementById('instagram-share');

    function shareToFacebook() {
      const currentURL = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer.php?u=${currentURL}`, 'Share to Facebook', 'width=600,height=400');
    }

    function shareToTwitter() {
      const currentURL = encodeURIComponent(window.location.href);
      window.open(`https://twitter.com/share?url=${currentURL}`, 'Share to Twitter', 'width=600,height=400');
    }

    function shareToWhatsapp() {
      const currentURL = encodeURIComponent(window.location.href);
      const whatsappMessage = encodeURIComponent('Check out this article: ' + currentURL);
      window.open(`https://wa.me/?text=${whatsappMessage}`, '_blank');
    }

    function shareToInstagram() {
      // Karena Instagram tidak mendukung share melalui URL, kita hanya membuka link profil Instagram
      window.open('https://www.instagram.com/', 'Go to Instagram');
    }

    facebookShare.addEventListener('click', shareToFacebook);
    twitterShare.addEventListener('click', shareToTwitter);
    whatsappShare.addEventListener('click', shareToWhatsapp);
    instagramShare.addEventListener('click', shareToInstagram);
  });

  // 07.Blog

  document.addEventListener('DOMContentLoaded', function () {
    const articlesPerLoad = 3;
    let currentLoadedArticles = 0;
    let allArticlesData = [];

    function fetchArticles() {
      fetch('https://dashboard.taufiqproject.my.id/blogs')
        .then((response) => response.json())
        .then((data) => {
          allArticlesData = data;
          displayArticles(currentLoadedArticles, articlesPerLoad);
          setupCategoryFilter();
        })
        .catch((error) => console.error('Error fetching articles:', error));
    }

    function truncateText(text, limit) {
      const words = text.split(' ');
      if (words.length > limit) {
        return words.slice(0, limit).join(' ') + '...';
      }
      return text;
    }

    function displayArticles(startIndex, count) {
      const blogContainer = document.getElementById('blog-container');
      const loadMoreContainer = document.querySelector('.load-more-container');

      const endIndex = Math.min(startIndex + count, allArticlesData.length);

      for (let i = startIndex; i < endIndex; i++) {
        const article = allArticlesData[i];
        const truncatedContent = truncateText(article.content, 25);

        const articleHTML = `
        <div class="blog-item">
          <img src="https://dashboard.taufiqproject.my.id/assets/dashboard/blog/${article.image}" alt="Blog" />
          <ul class="blog-meta">
            <li><i class="far fa-calendar-alt"></i> ${new Date(article.date).toDateString()}</li>
            <li><i class="far fa-comments"></i> Comments (${article.comments})</li>
            <li><i class="far fa-share-square"></i> Shares (${article.shares})</li>
            <li><i class="far fa-heart"></i> Likes (${article.likes})</li>
          </ul>
          <h3>
            <a href="blog-details.html?id=${article.slug}" data-title="${article.title}">${article.title}</a>
          </h3>
          <p>${truncatedContent}</p>
          <a href="blog-details.html?id=${article.slug}" class="read-more">read more <i class="fas fa-arrow-right"></i></a>
        </div>
      `;

        blogContainer.insertAdjacentHTML('beforeend', articleHTML);
      }

      if (endIndex < allArticlesData.length) {
        const remainingArticles = allArticlesData.length - endIndex;
        const loadMoreHTML = `
        <p class="load-more-info">+${remainingArticles} more articles available</p>
      `;
        loadMoreContainer.innerHTML = loadMoreHTML;
        document.getElementById('load-more-btn').style.display = 'block';
      } else {
        loadMoreContainer.innerHTML = '';
        document.getElementById('load-more-btn').style.display = 'none';
      }
    }

    function loadMoreArticles() {
      currentLoadedArticles += articlesPerLoad;
      displayArticles(currentLoadedArticles, articlesPerLoad);
    }

    fetchArticles();

    document.getElementById('load-more-btn').addEventListener('click', loadMoreArticles);
  });

  //   08.Blog-Details
  // Fungsi untuk mendapatkan parameter dari URL
  function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  // Fungsi untuk menampilkan detail artikel berdasarkan slug yang diberikan
  function displayArticleDetails(articleSlug) {
    fetch('https://dashboard.taufiqproject.my.id/blogs')
      .then((response) => response.json())
      .then((data) => {
        const article = data.find((article) => article.slug === articleSlug);
        if (article) {
          // Menampilkan detail artikel di halaman
          const articleDetails = `
          <div class="blog-item">
            <img src="https://dashboard.taufiqproject.my.id/assets/dashboard/blog/${article.image}" alt="Blog" />
            <ul class="blog-meta">
              <li><i class="far fa-calendar-alt"></i> ${new Date(article.date).toDateString()}</li>
              <li><i class="far fa-comments"></i> Comments (${article.comments})</li>
              <li><i class="far fa-share-square"></i> Share (${article.shares})</li>
              <li><i class="far fa-heart"></i> Likes (${article.likes})</li>
            </ul>
            <h3>${article.title}</h3>
            ${article.content}
          </div>
        `;
          const blogDetailsContainer = document.querySelector('.blog-details-container');
          blogDetailsContainer.insertAdjacentHTML('beforeend', articleDetails);

          // Menampilkan tag pada elemen HTML dengan class "tag-clouds mb-10 mr-auto"
          const tagsContainer = document.querySelector('.tag-clouds.mb-10.mr-auto');
          const categoriesHTML = article.category.map((category) => `<a href="#">${category}</a>`).join(' ');
          tagsContainer.innerHTML = `<b>Categories</b> ${categoriesHTML}`;
        } else {
          // Artikel tidak ditemukan, tampilkan pesan kesalahan
          const errorDetails = '<p>Article not found.</p>';
          const blogDetailsContainer = document.querySelector('.blog-details-container');
          blogDetailsContainer.insertAdjacentHTML('beforeend', errorDetails);
        }
      })
      .catch((error) => console.error('Error fetching articles:', error));
  }

  // Panggil fungsi untuk menampilkan detail artikel berdasarkan slug yang ada di URL
  const articleSlug = getURLParameter('id');
  if (articleSlug) {
    displayArticleDetails(articleSlug);
  }

  // 09. Recent News Blog
  fetch('https://dashboard.taufiqproject.my.id/blogs')
    .then((response) => response.json())
    .then((data) => {
      // Sort articles by date in descending order (most recent first)
      const sortedArticles = data.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Get the three most recent articles
      const recentArticles = sortedArticles.slice(0, 3);

      // Generate HTML for each recent article and append to the news-widget-wrap element
      const recentNewsElement = document.getElementById('recent-news');
      recentArticles.forEach((article) => {
        const articleHTML = `
          <div class="news-widget-item">
            <img src="https://dashboard.taufiqproject.my.id/assets/dashboard/blog/${article.image}" style= "width: 100px; height: 100px;" alt="News" />
            <div class="content">
              <h6><a href="blog-details.html?id=${article.slug}">${article.title}</a></h6>
              <span class="date"><i class="far fa-calendar-alt"></i> <a href="blog-details.html?id=${article.slug}">${new Date(article.date).toDateString()}</a></span>
            </div>
          </div>
        `;
        recentNewsElement.innerHTML += articleHTML;
      });
    })
    .catch((error) => {
      console.error('Error fetching articles:', error);
    });

  // 10. Category Blog
  fetch('https://dashboard.taufiqproject.my.id/blogs')
    .then((response) => response.json())
    .then((data) => {
      // Create an object to store the category names and their occurrences
      const categoryCounts = {};

      // Loop through each article to extract the category names and count their occurrences
      data.forEach((article) => {
        article.category.forEach((category) => {
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });
      });

      // Get the category list element
      const categoryListElement = document.getElementById('category-list');

      // Generate HTML for each category and its occurrence count and append to the category list element
      for (const category in categoryCounts) {
        const categoryHTML = `
          <li>
            <a href="#">${category}</a>
            <span>(${categoryCounts[category]})</span>
          </li>
        `;
        categoryListElement.innerHTML += categoryHTML;
      }
    })
    .catch((error) => {
      console.error('Error fetching articles:', error);
    });

  // 11. Popular Tag
  fetch('https://dashboard.taufiqproject.my.id/blogs')
    .then((response) => response.json())
    .then((data) => {
      const uniqueCategories = new Set();

      data.forEach((article) => {
        article.category.forEach((category) => {
          uniqueCategories.add(category);
        });
      });

      const popularCategoriesElement = document.getElementById('popular-categories');

      uniqueCategories.forEach((category) => {
        const categoryHTML = `<a href="blog.html">${category}</a>`;
        popularCategoriesElement.innerHTML += categoryHTML;
      });
    })
    .catch((error) => {
      console.error('Error fetching articles:', error);
    });

  // 12. SendEmail
  document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    const responseMessage = document.getElementById('response-message');

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Ambil nilai-nilai dari formulir
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      // Konfigurasi data untuk dikirimkan ke Formspree
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('message', message);

      // Kirim data ke Formspree menggunakan Fetch API
      fetch('https://formspree.io/f/mrgwbkpb', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            // Jika berhasil mengirimkan data, tampilkan pesan sukses
            responseMessage.innerHTML = '<p>Thank you for your message! We will get back to you soon.</p>';
            responseMessage.classList.add('success');
            contactForm.reset();
          } else {
            // Jika gagal mengirimkan data, tampilkan pesan error
            responseMessage.innerHTML = '<p>Oops! Something went wrong. Please try again later.</p>';
            responseMessage.classList.add('error');
          }
        })
        .catch((error) => {
          console.error('Error sending form data:', error);
          responseMessage.innerHTML = '<p>Oops! Something went wrong. Please try again later.</p>';
          responseMessage.classList.add('error');
        });
    });
  });

  /* ==========================================================================
       When document is loaded, do
       ========================================================================== */

  $(window).on('load', function () {
    // 11. Preloader
    if ($('.preloader').length) {
      $('.preloader').fadeOut('slow');
    }
    if ($('.a-intro').length) {
      $('.a-intro').addClass('active');
    }
  });
})(window.jQuery);

// darkmode toggle
const iconToggle = document.getElementById('iconToggle');

iconToggle.addEventListener('click', function () {
  if (iconToggle.classList.contains('fa-moon')) {
    window.location.href = 'index-dark.html';
  } else {
    window.location.href = '/';
  }
});

// mousemove
document.addEventListener('mousemove', (event) => {
  if (isUsernamPasswordValid()) {
    return;
  }
  escape(event);
});

// Language and Theme
// Function to change language and theme
function changeLanguage(lang, theme) {
  const languageItems = document.getElementsByClassName('menu-lang-item');

  for (let i = 0; i < languageItems.length; i++) {
    languageItems[i].classList.remove('active');
  }

  const selectedLanguage = document.querySelector(`[onclick="changeLanguage('${lang}')"]`);
  selectedLanguage.classList.add('active');

  localStorage.setItem('selectedTheme', theme);
}

// Function to set active class based on saved theme in localStorage
function setActiveTheme() {
  const selectedTheme = localStorage.getItem('selectedTheme');
  if (selectedTheme === 'ina') {
    const darkLanguage = document.querySelector(`[onclick="changeLanguage('ina')"]`);
    darkLanguage.classList.add('active');
  } else {
    const lightLanguage = document.querySelector(`[onclick="changeLanguage('eng')"]`);
    lightLanguage.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', setActiveTheme);

// Anime Typed
document.addEventListener('DOMContentLoaded', function () {
  var options = {
    strings: ['Superhero', 'Taufiq Fadillah', 'Web Development', 'Freelancer'],
    typeSpeed: 100,
    backSpeed: 70,
    backDelay: 1000,
    startDelay: 1000,
    loop: true,
  };
  var typed = new Typed('.text-typed', options);
});
