import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface BrowserWindowProps {
    imageSrc: string;
    projectUrl: string;
    title: string;
    className?: string;
}

export function BrowserWindow({
    imageSrc,
    projectUrl,
    title,
    className = "",
}: BrowserWindowProps) {
    return (
        <motion.a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full rounded-xl overflow-hidden bg-[#1e1e1e] border border-zinc-800 shadow-2xl group ${className}`}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {/* Browser Header */}
            <div className="h-10 bg-[#2d2d2d] flex items-center px-4 border-b border-zinc-700/50 relative">
                {/* Traffic Lights */}
                <div className="flex gap-2 absolute left-4">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                </div>

                {/* Address Bar */}
                <div className="flex-1 flex justify-center mx-16">
                    <div className="w-full max-w-md bg-[#1e1e1e] rounded flex items-center px-3 py-1 text-xs text-zinc-400 border border-zinc-700/50 group-hover:border-zinc-600 transition-colors">
                        <svg
                            className="w-3 h-3 mr-2 text-zinc-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                        <span className="truncate">{projectUrl.replace(/^https?:\/\//, "")}</span>
                    </div>
                </div>

                {/* Action Icons */}
                <div className="flex gap-3 absolute right-4 text-zinc-500">
                    <svg
                        className="w-4 h-4 hover:text-zinc-300 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                    </svg>
                </div>
            </div>

            {/* Content Area */}
            <div className="relative aspect-video w-full bg-zinc-900 overflow-hidden">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
            </div>
        </motion.a>
    );
}
