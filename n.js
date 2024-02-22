// Complex Password Function
function Password() {
    return  re = /\w{3,6}(\^|\%|\$|\#|\@|\!|\^|\&|\*)(\d{3,5})?(\w{3,10})/ig;
};
let pass = document.querySelector(".Pass");
let message = document.querySelector(".message");
let form = document.querySelector("form");
let wrongPass = document.querySelector(".false");
let hide = false;
let spanPassword = document.querySelector(".fa-eye-low-vision");
pass.addEventListener("input",()=> {
    if(pass.value.length >= 15) {
        pass.blur();
        message.style.cssText += "visibility: visible;opacity: 1;display:inline;";
        let counter = setTimeout(function() {
            return message.style.cssText += "visibility: hidden;opacity: 0;";
        },2000);
    };
});
form.addEventListener("submit",function(e) {
    if(Password().test(pass.value) === false) {
        wrongPass.style.cssText += "visibility: visible;opacity: 1;display:inline-block;";
        let counter = setTimeout(function() {
            return wrongPass.style.cssText += "visibility: hidden;opacity: 0;";
        },4000);
        e.preventDefault();
    }
})
// Function To Hide And Show Password
function HideVsShow() {
    if(hide) {
        pass.setAttribute("type","password");
        hide = false;
    }else {
        pass.setAttribute("type","text");
        hide = true;
    };
};
// Start canvas Code :(

// Selector All Element
let c = document.querySelector("#canvas");
let ctx = c.getContext("2d");
let btn = document.querySelector(".clear");
let start = document.querySelector(".start");
let stopBtn = document.querySelector(".stop");
let array = [];
let anotherArray = [];
let counter = 0;
let darwing = true;
// Add Size To Canvas Element
c.width = this.innerWidth;
c.height = this.innerHeight;
// Add Size When Window Resize
this.addEventListener("resize",function() {
    c.width = this.innerWidth;
    c.height = this.innerHeight;
});
// Create Mouse event 
let mouse = {
    x: undefined,
    y: undefined,
}
// Create Main Class To Take info From It

class Particle {
    // Main Constructor To get some info from it's
    constructor(x,y,size,color,speedX,speedY) {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 25;
        this.color = 'hsl(' + counter + ', 100% , 50% )';
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    // Functions to update And darw shpas
    // Function To update
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.3) this.size -= 0.1;
    };
    // Function To Darw
    darw() {
        ctx.beginPath();
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.arc(this.x , this.y , this.size , 0 , Math.PI * 2);
        ctx.fill();
        ctx.restore();
    };
};
// Inhertens Class From Particle
class InhParticle extends Particle {
    constructor(x,y,size,color,speedX,speedY) {
        super(x,y,size,color,speedX,speedY);
        this.x =   c.width / 2;
        this.y =   c.height / 2;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
    };
};
// Create Function To Darw random Things
let randomThings =  function () {
    for (let i = 0; i < 500; i++) {
        anotherArray.push(new InhParticle());
    };
};
// Create Funtion To Looping class to array
function addToArray() {
    for (let i = 0; i < 100; i++) {
        array.push(new Particle());
    };
};
addToArray();
// Create Function to make update And darw
function finalDarw() {
    for (let i = 0; i < array.length; i++) {
        array[i].update();
        array[i].darw();
        // This Condation To clear Shape If it Size less than 0.2;
        if(array[i].size <= 0.3) {
            array.splice(i , 1);
            i--;
        };
    };
    // This looping For another Array
    for (let i = 0; i < anotherArray.length; i++) {
        anotherArray[i].update();
        anotherArray[i].darw();
        // This Condation To clear Shape If it Size less than 0.2;
        if(anotherArray[i].size <= 0.3) {
            anotherArray.splice(i , 1);
            i--;
        };
    };
};
// Create Function To Animiat Shape if You Wanna it 
function animait() {
    // This Code To make opicty at cricles
    ctx.fillStyle = "rgba(0,0,0,.09)";
    ctx.fillRect(0 , 0 ,c.width , c.height);
    // End Code To make opicty at cricles
    counter += 2;
    finalDarw();
    requestAnimationFrame(animait);
};
animait();
function animaitTwo() {
    // If You want to Clear Rect don't comment the second code
    finalDarwRandom();
    counter+= 5;
    requestAnimationFrame(animaitTwo);
};
// Change Status To Darw Or not 
// Start Darwing
start.addEventListener("click",function() {
    c.classList.add("acitve");
    if(c.classList.contains("acitve")) darwing = true;
});
// Stop Darwing
stopBtn.addEventListener("click",function() {
    if(c.classList.contains("acitve")) {
        c.classList.remove("acitve");
    };
    darwing = false;
    clearInterval(interval);
});
// Hello If You Wanna make Mouse event Like mouseMove or mouse click 
// Mouse move Event
// those functions To Randow Shape in Canvas element
let interval  = function() {
    setInterval(randomThings , 8000);
}
interval();
randomThings();
// End functions To Randow Shape in Canvas element
// Mouse Click Event 
c.addEventListener("mousemove",function(e) {
    if(darwing) {
        mouse.x = e.x;
        mouse.y = e.y;
        // If You Wanna Change It To Create Custom Shape You Should To Change Mouse x and mouse y from Class Particle
        for (let i = 0; i < 5; i++) {
            array.push(new Particle());
        };
    };
});
// Add event when button click to clear Shapes
btn.addEventListener("click",function() {
    ctx.clearRect(0 , 0 , c.width , c.height);
});