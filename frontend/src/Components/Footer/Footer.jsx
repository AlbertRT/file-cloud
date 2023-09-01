import React from 'react';
import "./Footer.scss";
import { LuGitCommit } from 'react-icons/lu';

const Footer = () => {
  return (
    <div className="Footer">
        <div className="version">
            <div className="icons">
                <LuGitCommit />
            </div>
            <div className="version">
                <div className="channel">Alpha</div>
                <div className="version">1.0.0</div>
            </div>
        </div>
    </div>
  )
}

export default Footer