let spheresArr = document.querySelectorAll(".sphere--forAnim");
let randNumArr = [];
let randSignsArr = [];
let spheresCont = document.querySelectorAll(".sphere__container");
let sphereOrangeBackColor = "radial-gradient(95.71% 95.71% at 21.3% 8.33%, #FFE1B4 24.11%, #E4951D 78.77%)";
let sphereTurqBackColor = "radial-gradient(95.71% 95.71% at 21.3% 8.33%, #C7FFF0 24.11%, #2AD6AB 78.77%)";

// FilterEllipse
let appPicFilterEllipse = document.querySelector(".application__picture-filterEllipse");

let isAnim = false;
let animationQueue = []; // Черга для анімації

// Додаємо натискання на кулю
spheresArr.forEach(element => {
    element.addEventListener('pointerdown', function() {
        if (element.classList.contains('active')) {
            return;
        }

        animationQueue.push(element);
        processQueue(); 
    });
});

function processQueue() {
    
    if (animationQueue.length > 0 || !isAnim) {
        const element = animationQueue.shift();
        
        if(element){
            element.classList.add('active');
        }
        
        isAnim = true;
        
        setTimeout(() => {
            processQueue(); // Обробка наступного елемента в черзі
        }, 4000);
    }
    
}

// Анімація вибуху кулі при зміні розміру
new ResizeSensor(spheresArr, function() {
    spheresCont.forEach((element, index) => {
        element.querySelectorAll('.sphere--forAnim').forEach(container => {
            if (container.offsetWidth >= 400 && isAnim) {
                
                createRippleEffect(element, container);

                const timeOut = getAnimationDuration(container);

                // Додаємо приховування кулі після вибуху
                setTimeout(() => {
                    container.classList.remove('active');

                    container.classList.add('sphere--hidden');
                    
                    // Відновлення кулі через 2 секунди
                    setTimeout(() => {
                        container.classList.remove('sphere--hidden');
                        isAnim = false;
                    }, 2000);
                }, timeOut);
            }
        });
    });
});

// Функція для створення ефекту ripple
function createRippleEffect(element, container) {

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
                

    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.content = '';
    ripple.style.display = 'block';
    ripple.style.width = ripple.style.height = `400px`;
    ripple.style.top =  `${-200 + centerY}px`;
    ripple.style.left = `${-200 + centerX}px`;
    ripple.style.borderRadius = '50%';
    ripple.style.zIndex = 1000;
    ripple.style.background = sphereOrangeBackColor;

    ripple.classList.add('ripple');

    if (element.classList.contains('sphere__contOrange')) {
        ripple.style.background = sphereOrangeBackColor;
    } else {
        ripple.style.background = sphereTurqBackColor;
    }

    element.appendChild(ripple);

    // Видалення ripple після завершення анімації
    setTimeout(() => {
        ripple.remove();
    }, getAnimationDuration(ripple));
}

// Отримання тривалості анімації
function getAnimationDuration(element) {
    const aDuration = window.getComputedStyle(element).animationDuration;
    return aDuration.includes('ms') ?
        parseFloat(aDuration) : parseFloat(aDuration) * 1000;
}

// Генерація випадкових чисел для анімації руху
getRandArray();
getSignsArray();

// Анімація руху сфер при наведенні миші
window.addEventListener('mousemove', function(e) {
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;
    
    AnimAndTurnFunc(x, y);

    appPicFilterEllipse.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
});

// Функція для переміщення і зміни кольору сфер
function AnimAndTurnFunc(x, y){
    for (let i = 0; i < spheresArr.length; i++) {
        const element = spheresArr[i];
        element.style.transform = `translate(${randSignsArr[i]}${x * randNumArr[i]}px, ${randSignsArr[i]}${y * randNumArr[i]}px)`;

        if(element.classList.contains("sphere--orange")) {
            element.style.background = `radial-gradient(95.71% 95.71% at ${x * randNumArr[i]}% ${y * randNumArr[i]}%, #FFE1B4 24.11%, #E4951D 78.77%)`;
        } else {
            element.style.background = `radial-gradient(95.71% 95.71% at ${x * randNumArr[i]}% ${y * randNumArr[i]}%, #C7FFF0 24.11%, #2AD6AB 78.77%)`;
        }
    }
}

function getRandArray(){
    for (let i = 0; i < spheresArr.length; i++) {
        randNumArr.push(Math.floor(Math.random() * 61));
    }
}

function getSignsArray(){
    for (let i = 0; i < spheresArr.length; i++) {
        randSignsArr.push(Math.random() < 0.5 ? '-' : '+');
    }
}
