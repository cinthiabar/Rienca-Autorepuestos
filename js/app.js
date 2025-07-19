(function(){

    const listElements = document.querySelectorAll('.menu_item--show');/*llama a esta cla(los li de los menu desplegables)*/
    const list = document.querySelector('.menu');/*llama a esta clase(ul de los links del menu)*/
    const menu = document.querySelector('.menu_hamburguesa');/*llama a esta clase(clase donde está del icono del menu hamburguesa)*/

    const addClick = ()=>{
        listElements.forEach(element =>{
            element.addEventListener('click', ()=>{

                let subMenu = element.children[1];/*llama al segundo hijo de lo menus desplegables (ul)*/
                let height = 0;
                element.classList.toggle('menu_item--active');

                console.log(subMenu.clientHeight);

                if(subMenu.clientHeight == 0){/*si altura es igual a cero coloca la altura minima del submenu*/
                    height = subMenu.scrollHeight;
                }

                subMenu.style.height = `${height}px`/*con esto agrega esa altura*/            


            });

        });
    }

    const deleteStyleHeight = ()=>{
        listElements.forEach(element=>{

            if(element.children[1].getAttribute('style')){
                element.children[1].removeAttribute('style');
                element.classList.remove('menu_item--active');
            }
        });
    }

    window.addEventListener('resize', ()=>{/*cda que la ventana es redimensionada*/

        if(window.innerWidth > 800){/*si el ancho del viewport es mayor a 800*/
            deleteStyleHeight();
            if(list.classList.contains('menu_links--show')){
                list.classList.remove('menu_links--show')
            }

        }else{
            addClick();
        }

    });

    if(window.innerWidth <= 800){
        addClick();
    }

    menu.addEventListener('click',()=> list.classList.toggle('menu_links--show'));


})();

