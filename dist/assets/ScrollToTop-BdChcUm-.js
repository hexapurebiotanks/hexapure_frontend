import{j as r,r as t}from"./index-Yqfij8K6.js";import{c as l}from"./createSvgIcon-B_Lv-zv3.js";const i=l(r.jsx("path",{d:"M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"})),f=()=>{const[s,o]=t.useState(!1),e=()=>{window.pageYOffset>300?o(!0):o(!1)};t.useEffect(()=>(window.addEventListener("scroll",e),()=>{window.removeEventListener("scroll",e)}),[]);const n=()=>{window.scrollTo({top:0,behavior:"smooth"})};return r.jsx(r.Fragment,{children:s&&r.jsx("button",{onClick:n,className:`\r
                        fixed bottom-8 left-8 z-40\r
                        w-12 h-12\r
                        bg-primary hover:bg-primary-dark\r
                        text-white\r
                        rounded-full\r
                        flex items-center justify-center\r
                        shadow-lg hover:shadow-xl\r
                        transition-all duration-300\r
                        hover:scale-110\r
                        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2\r
                    `,"aria-label":"Scroll to top",title:"Scroll to top",children:r.jsx(i,{className:"text-xl"})})})};export{f as default};
