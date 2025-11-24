import React from 'react';
import './DocsSidebar.css';

const DocsSidebar = () => {
    return (
        <aside className="docs-sidebar">
            <h3>Documentation</h3>
            <ul>
                <li><a href="#intro">Introduction</a></li>
                <li><a href="#api">API</a></li>
                <li><a href="#setup">Setup</a></li>
                <li><a href="#deploy">Deployment</a></li>
            </ul>
        </aside>
    );
};

export default DocsSidebar;
