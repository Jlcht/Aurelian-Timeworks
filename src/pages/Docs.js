import React from 'react';
import Header from '../components/Header/Header';
import DocsSidebar from '../components/Sidebar/DocsSidebar';
import DocsContent from '../components/DocsContent/DocsContent';
import './Docs.css';

const Docs = () => {
    return (
        <>
            <Header/>
            <div className="docs-layout">
                <DocsSidebar/>
                <DocsContent/>
            </div>
        </>
    );
};

export default Docs;
