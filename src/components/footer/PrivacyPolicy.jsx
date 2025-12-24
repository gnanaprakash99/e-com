import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl text-center font-bold mb-4">Privacy Policy</h1>
            <p className="mb-2">
                Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <ul className="list-disc pl-6">
                <li>We do not share your personal information with third parties.</li>
                <li>All data is stored securely and used only for order processing and communication.</li>
                <li>Users can request deletion of their data at any time.</li>
            </ul>
            <p className="mt-4">By using our website, you agree to the terms outlined in this privacy policy.</p>
        </div>
    );
};

export default PrivacyPolicy;
