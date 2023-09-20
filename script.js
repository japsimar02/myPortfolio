//Smooth scrolling using locomotive scroll library

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


//animation of cover page 

function firstPageAnim(){
    var tl = gsap.timeline();
    tl.from("#nav", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingElem", {
        y: 0, 
        duration: 2,
        delay: -1,
        stagger: .2,
        ease: Expo.easeInOut
    })
    .from("#main-footer", {
        y: -10, 
        opacity: 0, 
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    });
}


//mouse pointer movements 

var timeout;
function flattenCircle(){
    // Default Scale Value
    var xscale = 1;  
    var yscale = 1;

    // Previous Values
    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeout);  //starts with clearing previously set timer

        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;

        xscale = gsap.utils.clamp(0.75, 1.25, xdiff);
        yscale = gsap.utils.clamp(0.75, 1.25, ydiff);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);

        // 100ms later, circle becomes completely round again, if not being moved 
        timeout = this.setTimeout(function() {
            document.querySelector("#circle-pointer").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100);
    });
}

function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#circle-pointer").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

flattenCircle();
circleMouseFollower();
firstPageAnim();


//project image animations

document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });

    elem.addEventListener("mousemove", function(dets){
        var diff = dets.clientY - elem.getBoundingClientRect().top; //dist of my mouse cursor from top of the current div element
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,   //hover pe show ho
            ease: Power3,
            top: diff,    //top se diff niche le aao
            left: dets.clientX,   //left se cursor jitna aage lao
            rotate: gsap.utils.clamp(-35, 35, diffrot*0.5)
        });
    });
});


//timer at footer 

function getTime(){
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    document.getElementById("time").innerHTML = time;
}

getTime();
setInterval(getTime, 1000);


//sidebar actions 

const sidebarNavElement = document.getElementById("sidebar-nav-id")
const openSidebarNavElement = document.getElementById("open-nav-sidebar")
const closeSidebarNavElement = document.getElementById("close-nav-sidebar")
const sidebar = document.getElementById('sidebar-nav');
openSidebarNavElement.addEventListener("click", ()=>{
    sidebarNavElement.classList.toggle("sidebar-show")
});

closeSidebarNavElement.addEventListener("click", ()=>{
    sidebarNavElement.classList.toggle("sidebar-show")
});

const submenuItems = document.querySelectorAll('.has-submenu');
submenuItems.forEach(item => {
  item.addEventListener("click", () => {
    item.classList.toggle("open");
    const submenu = item.querySelector(".submenu");
    if (submenu.style.display === 'block') {
      submenu.style.display = 'none';
      submenu.style.opacity = 0;
      submenu.style.transform = 'translateY(-10px)';
    } 
    else {
      submenu.style.display = 'block';
      submenu.style.opacity = 1;
      submenu.style.transform = 'translateY(0)';
    }
  });
});


//education section animation and functions

function onEducationVisible() {
    var active = 3;
    var minicircles = document.querySelectorAll(".minicircle");
    var secondhalf = document.querySelectorAll(".secondhalf");

    gsap.to(minicircles[active-1], {
        opacity: 0.8
    });

    gsap.to(secondhalf[active-1], {
        opacity: 0.7
    });

    minicircles.forEach(function(val, index){
        val.addEventListener("click", function(){
            gsap.to("#main-circle", {
                rotate: (3-(index+1))*10
            });
            greyOut();
            gsap.to(this,{
                opacity: 0.7
            });
            gsap.to(secondhalf[index], {
                opacity: 0.7,
                duration: 0.6, 
            });
        });
    });

    function greyOut(){
        gsap.to(minicircles, {
            opacity: 0.3,
            ease: Expo.easeInOut,
        });
        gsap.to(secondhalf, {
            opacity: 0.1
        });
    }

    gsap.to("#main-circle", {
        rotate: 0,
        ease: Expo.easeInOut,
        duration: 3
    });
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id === 'education') {
            onEducationVisible();
            observer.disconnect();
        }
    });
});

const educationSection = document.getElementById('education');
observer.observe(educationSection);
