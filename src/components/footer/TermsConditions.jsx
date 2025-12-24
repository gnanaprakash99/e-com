import React from 'react';

const TermsConditions = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl text-center font-bold mb-4">Terms & Conditions</h1>
            <p className="mb-2">
                By using our website, you agree to the following terms and conditions:
            </p>
            <ul className="list-disc pl-6">
                <li>All content on this website is for personal use only.</li>
                <li>Unauthorized use or reproduction of our content is prohibited.</li>
                <li>We reserve the right to update or modify these terms at any time.</li>
            </ul>
            <p className="mt-4">Please review these terms regularly for any updates.</p>
        </div>
    );
};

export default TermsConditions;
