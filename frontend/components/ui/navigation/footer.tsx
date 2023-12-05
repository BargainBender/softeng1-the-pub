"use client";
import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    const [isVisible, setIsVisible] = useState(false);
    let lastScrollTop = 0;

    useEffect(() => {
        window.onscroll = () => {
            let st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop) {
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    setIsVisible(true);
                }
            } else {
                setIsVisible(false);
            }
            lastScrollTop = st <= 0 ? 0 : st;
        };
    }, []);

    return isVisible && (
        <footer style={{
            position: 'fixed',
            bottom: '0',
            width: '100%',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column', // Changed to column to stack items vertically
            justifyContent: 'center', // Centered vertically
            alignItems: 'center', // Centered horizontally
            height: '100px', // Increased height to accommodate stacked items
            boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
            padding: '10px 20px', // Adjusted padding for spacing
        }}>
            <p style={{ margin: '0' }}>
                © 2023 | All rights reserved | <span style={{ color: 'rgba(59, 178, 130, 0.54)', fontWeight: 'bold' }}>The Pub Official</span>
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <FaFacebookF size={30} style={{ margin: '0 10px' }} />
                <FaTwitter size={30} style={{ margin: '0 10px' }} />
                <FaInstagram size={30} style={{ margin: '0 10px' }} />
            </div>
        </footer>
    );
}
