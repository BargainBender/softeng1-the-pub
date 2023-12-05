"use client";

import React from 'react'
import { useState, useEffect } from "react";

export default function Footer() {
    const [isVisible, setIsVisible] = useState(false);
    let lastScrollTop = 0;

    useEffect(() => {
        window.onscroll = () => {
            let st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop){
                // downscroll code
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    setIsVisible(true);
                }
            } else {
                // upscroll code
                setIsVisible(false);
            }
            lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        };
    }, []);

    return (
        isVisible && (
            <footer style={{
                position: 'fixed',
                bottom: '0',
                width: '100%',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '60px', 
                boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)', 
            }}>
                <p>© 2023 | All rights reserved | <span style={{color: 'rgba(59, 178, 130, 0.54)', fontWeight: 'bold'}}>The Pub Official</span></p>
            </footer>
        )
    )
}