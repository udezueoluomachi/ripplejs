//this is the first version
//version 1.0.0
class Ripple {

    //the ripple position is only accurate for elements whose display is set to relative
    
    //rippleParentId is the id of the element to which the ripple effect is to be added
    
    //the height and width of the ripple are of type => number while others are of type => string

    createRipple(ripple) {
        let rippleParent;
        const getById = e => document.getElementById(e) , $only = e => document.querySelector(e);
        ripple.rippleParentId != "undefined" && getById(ripple.rippleParentId) ? rippleParent = getById(ripple.rippleParentId) : console.log(`Ripplejs error: element ${ripple.rippleParentId} not found in DOM. Please provide a valid element id`);
        
        //removing any previous ripple
        if($only(`#${ripple.rippleParentId} .ripple`)) {
            rippleParent.removeChild($only(`#${ripple.rippleParentId} .ripple`))
        }

        //forcing the display of the parent to be relative to ensure acurate positioning of the ripple
        
        rippleParent.style.position = "relative";


        //creating the ripple
        const rippleElem = document.createElement("canvas");
        rippleElem.height = ripple.height;
        rippleElem.width = ripple.width;
        rippleElem.innerHTML = "Please update or change your browser :D";
        rippleElem.style.position = "absolute";
        rippleElem.style.top = "0";
        rippleElem.style.left = "0";
        //to assist custom styling of the ripple a class is provided
        //so users can style generally or relatively
        //e.g parent .ripple {/*css code*/}
        rippleElem.classList.add("ripple");

        //getting predifined user provided values and applying it to the ripple
        //x and y are the position of the starting point ou the ripple
        //the max radius is calculated based on the length of the diagonal of the parent element
        let x = event.offsetX , y = event.offsetY , maxRadius = Math.sqrt((rippleElem.height ** 2) + (rippleElem.width ** 2)) ,  initialRadius = (maxRadius * 2) / 100;

        const ctx = rippleElem.getContext("2d");
        const drawCircle2 = () => {
            ctx.strokeStyle = ripple.foreground;
            ctx.beginPath();
            ctx.arc(x,y,initialRadius / 2, 0 , Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = ripple.foreground;
            ctx.fill();
        }
        const drawCircle = () => {
            ctx.strokeStyle = ripple.background;
            ctx.beginPath();
            ctx.arc(x,y,initialRadius, 0 , Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = ripple.background;
            ctx.fill();
        }
        const clearRipple = () => {
            ctx.rect(0, 0 ,rippleElem.width, rippleElem.height);
            ctx.closePath();
            ctx.fillStyle = window.getComputedStyle(rippleParent , null).getPropertyValue("background-color");
            ctx.fill();
        }
        //this functions allows user to specify the ripple type
        //by default the 
        const doubleCircles = () => {
            drawCircle();
            drawCircle2();
        }
        let rippleAnimation = setInterval(
            () => {
                clearRipple();
                initialRadius += 10;
                ripple.type === "single" ? drawCircle() : doubleCircles();
                initialRadius > maxRadius ? function() {
                    clearInterval(rippleAnimation);
                    //initialRadius = (maxRadius * 10) / 100;
                    if($only(`#${ripple.rippleParentId} .ripple`)) {
                        rippleParent.removeChild($only(`#${ripple.rippleParentId} .ripple`))
                    }
                }() : null;
            }
            ,ripple.time);
        rippleParent.appendChild(rippleElem);
    }
}