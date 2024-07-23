import React from 'react';

const TermsAndConditions = () => {
    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Terms & Conditions</h2>
            <p>Introduction</p>
            <p style={{ textAlign: 'justify' }}>These Terms and Conditions ("Terms") govern your use of our chat system ("Service") and form a legally binding agreement between you and [Your Company Name].</p>
            <ol>
                <li>
                    <strong>Acceptance of Terms</strong>
                    <p>By using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms.</p>
                </li>
                <li>
                    <strong>Use of Service</strong>
                    <ol type="a">
                        <li>You must be at least 18 years old to use the Service.</li>
                        <li>You are responsible for maintaining the confidentiality of your account and password.</li>
                        <li>You agree to use the Service only for lawful purposes and not to engage in any form of harassment, discrimination, or spamming.</li>
                    </ol>
                </li>
                <li>
                    <strong>Intellectual Property</strong>
                    <ol type="a">
                        <li>You retain ownership of all intellectual property rights in your content.</li>
                        <li>By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display your content.</li>
                    </ol>
                </li>
                <li><strong>Warranty Disclaimer</strong>
                    <p>The Service is provided on an "as is" and "as available" basis, without warranties of any kind.</p>
                </li>
                <li><strong>Limitation of Liability</strong>
                    <p>In no event will we be liable for any indirect, incidental, special, or consequential damages.</p>
                </li>
                <li><strong>Termination</strong>
                    <p>We may terminate or suspend your account or access to the Service at any time, without notice.</p>
                </li>
                <li><strong>Governing Law</strong>
                    <p>These Terms will be governed by and construed in accordance with the laws of South Africa.</p>
                </li>
                <li><strong>Entire Agreement</strong>
                    <p>These Terms constitute the entire agreement between you and us regarding the Service.</p>
                </li>
            </ol>
        </div>
    );
}

const PrivacyPolicy = () => {
    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Privacy Policy</h2>
            <p>Introduction</p>
            <p style={{ textAlign: 'justify' }}>We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and disclose your information when you use our chat system.</p>
            <ol>
                <li>
                    <strong>Information We Collect</strong>
                    <ol type="a">
                        <li>Account information (e.g., name, email address, password)</li>
                        <li>Chat history and content</li>
                        <li>Device information (e.g., IP address, browser type)</li>
                    </ol>
                </li>
                <li>
                    <strong>Use of Information</strong>
                    <ol type="a">
                        <li>To provide and improve the Service</li>
                        <li>To respond to your inquiries and support requests</li>
                        <li>To prevent fraud and ensure the security of the Service</li>
                    </ol>
                </li>
                <li>
                    <strong>Disclosure of Information</strong>
                    <ol type="a">
                        <li>We may disclose your information to our affiliates and third-party service providers.</li>
                        <li>We may also disclose your information if required by law or to protect the rights, property, or safety of our users or the public.</li>
                    </ol>
                </li>
                <li><strong>Data Retention</strong>
                    <p>We will retain your information for as long as necessary to provide the Service and for a reasonable period of time thereafter.</p>
                </li>
                <li><strong>Data Security</strong>
                    <p>We implement reasonable security measures to protect your information from unauthorized access, use, or disclosure.</p>
                </li>
                <li><strong>Your Rights</strong>
                    <ol type="a">
                        <li>You have the right to access, correct, or delete your personal information.</li>
                        <li>You can also object to or restrict processing of your personal information.</li>
                    </ol>
                </li>
                <li><strong>Changes to this Privacy Policy</strong>
                    <p>We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting a notice on our website or by sending you an email.</p>
                </li>
            </ol>
        </div>
    );
}

const App = () => {
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Welcome to Chat</h1>
            <TermsAndConditions />
            <PrivacyPolicy />
        </div>
    );
}

export default App;
