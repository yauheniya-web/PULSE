$(document).ready(function(){
    $('.carousel .inner').slick({
        speed: 1200,
        /* adaptiveHeight: true, */
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></img></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></img></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                  dots: true,
                  arrows: false //выкл сами стрелочки под разрешение до 768
                }
            }
        ]
    });

    $('ul.tabs').on('click', 'li:not(.active)', function() { 
        //все табы, затем будем кликать по неактивным
        var indexClicked = $(this).index();
    
        $(this) // ссылается на тот элемент который нажали
          .addClass('active'); // li

          var naightborLi = $(this).siblings();
          console.log(naightborLi);

          naightborLi.removeClass('active') 
          

          var mainParentS = $(this).closest('.cont_catalog_tab');  // content
          console.log(mainParentS);
          
          var allContents = mainParentS.find('.content');

          allContents.removeClass('active');
          
          allContents.eq(indexClicked).addClass('active'); // находим ближайший элемент (родитель), у него находим классы рядомстоящие content и удаляем класс active, eq($(this).index()) - получаем номер элемента на который нажали, addClass('active') - и классу с контентом №2 добавляю активность
    });


    $('.cont_catalog_tab .link_more').on('click', function(e) {
        e.preventDefault();

        var pushedLinkMore = this;
        var pushedMoreJQ = $(pushedLinkMore);

        var currentProduct = pushedMoreJQ.closest('.product');
        currentProduct.removeClass('active');

        var currentList = pushedMoreJQ.closest('.wrapper').find('.list');
        currentList.addClass('active');

    })

    $('.cont_catalog_tab .link_back').on('click', function(e) {
        e.preventDefault();

        var pushedLinkBack = this;
        var pushedBackJQ = $(pushedLinkBack);

        var currentList = pushedBackJQ.closest('.list');
        currentList.removeClass('active');

        var currentProduct = pushedBackJQ.closest('.wrapper').find('.product');
        currentProduct.addClass('active');

    })

/*     $('.link').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.product').toggleClass('active');
            $('.list').toggleClass('active');
        })
    }); */
});