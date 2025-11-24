//animation to reveal next text on scroll 
"use client"; // client side for React use

import {useEffect} from "react"; // import from React

//reveal on scroll controller/animation

export function useRevealOnScroll(){ //call this function when...
    useEffect(() =>{ //useEffect runs after comp mounting
        const targets = document.querySelectorAll("[data-reveal"); // select all elements with that attribute
        const io = new IntersectionObserver( // create intersectionobserver to watch wehn elements enter viewport
            (entries) =>{
                //looping through new observed (in viewport) entries
                entries.forEach((e)=>{
                    if(e.isIntersecting){
                        //if its entering viewport
                        e.target.classList.add('in')// add class "in"
                        io.unobserve(e.target);// stop obversing once animation is done to save opwer/memory
                    }
                });
            },
            {
                threshold: 0.15, //trigger when 15% of element is visible
                rootMargin: "0px 0px -10% 0px", //adjust bottom margin to trigger slightly earlier Top (up right down left)
            }
        );
        targets.forEach((el) => io.observe(el)); // observe each target element
        //cleanup/ dsconnect when component unmounts
        return () => io.disconnect();

    }, []); //empty dependencies
}