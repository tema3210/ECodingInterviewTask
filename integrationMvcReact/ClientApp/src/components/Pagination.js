import { min, max } from 'lodash';
import React, { useMemo } from 'react';
import "./Pagination.css";

const opts = {

    endOfFstSection: 3,

    offsetLeft: 1,

    offsetRight: 2,

    bgnOfEndSection: 3
}

export const Pagination = ({ page, setPage, maxPages, displayOpts = opts }) => {

    const PageSpan = (pageNumber) => {
        return <span key={pageNumber} onClick={(ev) => { setPage(pageNumber); ev.preventDefault() }} onSelect={(ev) => ev.preventDefault()} className={`pageSpan, ${(pageNumber === page) ? 'currentPageSpan' : ''}`}> {pageNumber + 1}</span>
    }

    const DecPage = () => setPage(max([0, page - 1]));

    const IncPage = () => setPage(min([maxPages - 1, page + 1]));

    function* getPages() {
        let dotted = false;
        let noDot = 0;
        for (var i = 0; i < maxPages; i++) {

            if (i < displayOpts.endOfFstSection) {
                yield PageSpan(i);
                dotted = false;
                continue;
            };

            if (i >= page - displayOpts.offsetLeft && i <= page + displayOpts.offsetRight) {
                yield PageSpan(i);
                dotted = false;
                continue;
            };

            if (i >= maxPages - displayOpts.bgnOfEndSection) {
                yield PageSpan(i);
                dotted = false;
                continue;
            }; 

            if (!dotted) {
                yield <span key={`dots${noDot}`}>...</span>;
                noDot += 1;
                dotted = true;
            }
        }
    }

    let pages = useMemo(() => Array.from(getPages()),[maxPages,page, setPage]);

    return (
        <div>
            <span>
                <span onClick={DecPage} className="arrowSpan">&lt;</span>
                {
                    pages
                }        
                <span onClick={IncPage} className="arrowSpan">&gt;</span>
            </span>
        </div>
    );
}
