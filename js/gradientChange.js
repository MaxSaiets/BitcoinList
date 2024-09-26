// провести тести що більш краще оптимізоване через css чи js
let spheresArr = document.querySelectorAll(".sphere--forAnim");
let randNumArr = [];
let randSignsArr = [];

let spheresCont = document.querySelectorAll(".sphere__container");

let sphereOrangeBackColor = "radial-gradient(95.71% 95.71% at 21.3% 8.33%, #FFE1B4 24.11%, #E4951D 78.77%)";
let sphereTurqBackColor = "radial-gradient(95.71% 95.71% at 21.3% 8.33%, #C7FFF0 24.11%, #2AD6AB 78.77%)";

// FilterEllipse
let appPicFilterEllipse = document.querySelector(".application__picture-filterEllipse");

//бібліотека перевіряєє якщо 400px width то відбувається анімація (додається стиль ripple на ньому є анімація, вона завершується і стиль видаляється, як і елемент )
new ResizeSensor(spheresArr, function() {
    spheresCont.forEach(element => {
        element.querySelectorAll('.sphere--forAnim').forEach(container => {
            if (container.offsetWidth >= 400) {
                const ripple = document.createElement('span');
            
                ripple.style.width = ripple.style.height = `100px`;
                ripple.style.left = `50%`;
                ripple.style.top = `50%`;
                ripple.classList.add('ripple');
    
                if(element.classList.contains('sphere__contOrange'))
                    ripple.style.background = sphereOrangeBackColor;
                else
                    ripple.style.background = sphereTurqBackColor;
    
                element.appendChild(ripple);
                const timeOut = getAnimationDuration(ripple);
        
                element.children[0].remove();
    
                setTimeout(() => {
                    ripple ? ripple.remove() : null;
    
                    element.remove()
                }, timeOut);
        
                function getAnimationDuration(){
                    const aDuration = window.getComputedStyle(ripple).animationDuration;
                    return aDuration.includes('ms') ?
                        aDuration.replace("ms", '') : aDuration.replace("s", '') * 1000;
                }
            }
        });
    });
});


getRandArray();
getSignsArray();

window.addEventListener('mousemove', function(e) {
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;
    
    AnimAndTurnFunc(x, y);

    appPicFilterEllipse.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
});


function AnimAndTurnFunc(x, y){
    for (let i = 0; i < spheresArr.length; i++) {
        const element = spheresArr[i];
        
        element.style.transform = `translate(${randSignsArr[i]}${x * randNumArr[i]}px, ${randSignsArr[i]}${y * randNumArr[i]}px)`;

        if(element.classList.contains("sphere--orange"))
            element.style.background = `radial-gradient(95.71% 95.71% at ${x * randNumArr[i]}% ${y * randNumArr[i]}%, #FFE1B4 24.11%, #E4951D 78.77%)`;
        else
            element.style.background = `radial-gradient(95.71% 95.71% at ${x * randNumArr[i]}% ${y * randNumArr[i]}%, #C7FFF0 24.11%, #2AD6AB 78.77%)`;
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