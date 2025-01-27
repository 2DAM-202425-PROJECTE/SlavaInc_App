import React from 'react';
import { createRoot } from 'react-dom/client';
export default function Code() {
    return (
        <>
            <h1>Hello, World!</h1>
        </>
    );
}
if (document.getElementById('code')) {
    createRoot(document.getElementById('code')).render(<Code />);
}
