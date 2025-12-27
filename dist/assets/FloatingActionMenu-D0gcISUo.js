import{j as t,r as o}from"./index-W4UHybia.js";import{c as n}from"./createSvgIcon-BGFq9mHI.js";import{P as i}from"./Phone-DiLJgP4m.js";import{C as h}from"./Close-L9B8Ztgl.js";const x=n([t.jsx("path",{d:"M21 12.22C21 6.73 16.74 3 12 3c-4.69 0-9 3.65-9 9.28-.6.34-1 .98-1 1.72v2c0 1.1.9 2 2 2h1v-6.1c0-3.87 3.13-7 7-7s7 3.13 7 7V19h-8v2h8c1.1 0 2-.9 2-2v-1.22c.59-.31 1-.92 1-1.64v-2.3c0-.7-.41-1.31-1-1.62"},"0"),t.jsx("circle",{cx:"9",cy:"13",r:"1"},"1"),t.jsx("circle",{cx:"15",cy:"13",r:"1"},"2"),t.jsx("path",{d:"M18 11.03C17.52 8.18 15.04 6 12.05 6c-3.03 0-6.29 2.51-6.03 6.45 2.47-1.01 4.33-3.21 4.86-5.89 1.31 2.63 4 4.44 7.12 4.47"},"3")]),d=n(t.jsx("path",{d:"M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z"})),g=({onContactClick:r})=>{const[e,s]=o.useState(!1),a=()=>{s(!e)},l=()=>{window.open("https://wa.me/918903488003","_blank")},c=()=>{r&&r()};return t.jsxs("div",{className:"fixed bottom-8 right-8 z-50",children:[t.jsxs("div",{className:`
                flex flex-col items-center space-y-4 mb-4 
                transition-all duration-300 ease-in-out
                ${e?"opacity-100 visible translate-y-0":"opacity-0 invisible translate-y-4"}
            `,children:[t.jsx("button",{onClick:l,className:`\r
                        w-14 h-14\r
                        bg-green-500 hover:bg-green-600\r
                        text-white\r
                        rounded-full\r
                        flex items-center justify-center\r
                        shadow-lg hover:shadow-xl\r
                        transition-all duration-300\r
                        hover:scale-110\r
                    `,title:"WhatsApp",children:t.jsx(d,{className:"text-2xl"})}),t.jsx("button",{onClick:c,className:`\r
                        w-14 h-14\r
                        bg-gray-600 hover:bg-gray-700\r
                        text-white\r
                        rounded-full\r
                        flex items-center justify-center\r
                        shadow-lg hover:shadow-xl\r
                        transition-all duration-300\r
                        hover:scale-110\r
                    `,title:"Contact",children:t.jsx(i,{className:"text-2xl"})})]}),t.jsx("button",{onClick:a,className:`\r
                    w-16 h-16\r
                    bg-primary hover:bg-primary-dark\r
                    text-white\r
                    rounded-full\r
                    flex items-center justify-center\r
                    shadow-lg hover:shadow-xl\r
                    transition-all duration-300\r
                    hover:scale-110\r
                `,title:"Quick Actions",children:e?t.jsx(h,{className:"text-2xl"}):t.jsx(x,{className:"text-2xl"})})]})};export{g as default};
