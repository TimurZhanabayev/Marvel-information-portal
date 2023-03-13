import React from 'react';
import AppBanner from "../appBanner/AppBanner";
import ComicList from "../comicsList/ComicsList";

function ComicsPage() {
    return (
        <>
            <AppBanner/>
            <ComicList/>
        </>
    );
}

export default ComicsPage;