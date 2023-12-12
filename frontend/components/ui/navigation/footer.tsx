"use client";
import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <div className="w-full bg-white flex flex-col justify-center items-center h-24  shadow-md shadow-gray-900 p-6">
            <p className="m-0">
                © 2023 | All rights reserved | <span className="text-green-300 font-bold">The Pub Official</span>
            </p>
            <div className="flex justify-center my-3">
                <FaFacebookF size={30} className="mx-2" />
                <FaTwitter size={30} className="mx-2" />
                <FaInstagram size={30} className="mx-2" />
            </div>
        </div>
    );
}

//     <footer style={{
    // return isVisible && (
    //     <div style={{
    //         bottom: '0',
    //         width: '100%',
    //         backgroundColor: 'white',
    //         display: 'flex',
    //         flexDirection: 'column', // Changed to column to stack items vertically
    //         justifyContent: 'center', // Centered vertically
    //         alignItems: 'center', // Centered horizontally
    //         height: '100px', // Increased height to accommodate stacked items
    //         boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
    //         padding: '10px 20px', // Adjusted padding for spacing
    //     }}>
            // 

