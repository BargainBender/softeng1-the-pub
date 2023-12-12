"use client";
import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <div className="w-full bg-white flex flex-col justify-center items-center h-24 shadow-md shadow-gray-900 p-5">
            <p className="m-0">
                © 2023 | All Rights Reserved | <span className="text-green-300 font-bold">The Pub Official</span>
            </p>
            <div className="flex justify-center my-3">
                <FaFacebookF size={30} className="mx-1"/>
                <FaTwitter size={30} className="mx-1"/>
                <FaInstagram size={30} className="mx-1"/>
            </div>
        </div>
    );
}



