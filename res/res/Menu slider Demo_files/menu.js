var menuTrigger = function() {
    var triggerElement = document.querySelector('.ms_menu__trigger');

    triggerElement.addEventListener('click', function() {
        var menuBody = document.querySelector('.ms_menu_body__wrapper');

        if(menuBody.classList.contains("hide-menu")) {
            menuBody.classList.remove('hide-menu');
            menuBody.classList.add('show-menu'); 
        }
        else {
            menuBody.classList.remove('show-menu');
            menuBody.classList.add('hide-menu');   
        }
    });
}

