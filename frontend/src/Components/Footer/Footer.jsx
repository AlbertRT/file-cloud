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
                <div className="version">0.0.0a</div>
            </div>
        </div>
    </div>
  )
}

export default Footer