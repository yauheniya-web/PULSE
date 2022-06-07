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



    // Modals

    $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.close_window').on('click', function(){
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });
    
    $('.order_btn_mini').on('click', function() {
        let btn = $(this);
        let text = btn.closest('.item').find('.subtitle').text();
        $('#order .descr').text(text); //заменяет текст дочерним 
        $('.overlay, #order').fadeIn('slow');
    });

    function validForm(form){
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Please specify your name",
                phone: "Please specify your number",
                email: {
                  required: "We need your email address to contact you",
                  email: "Your email address must be in the format of name@domain.com"
                }
              }
        });
    }

    validForm('#consultation-form');
    validForm('#consultation form');
    validForm('#order form');


    var input_form_phone = $("input[name=phone]");
    console.log(input_form_phone);
    input_form_phone.mask("(777) 777-7777");
/*     $("#phone").mask("(999) 999-9999"); */

    $('form').submit(function(e){
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });


    //Smooth scroll and pageup
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1300) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();
});