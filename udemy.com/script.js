// ==UserScript==
// @name         Add copy link button on udemy
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add copy link button as Markdown button on udemy
// @author       You
// @match        https://www.udemy.com/course/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @run-at      document-idle
// ==/UserScript==

(function() {
    'use strict';

    function addCopyLinkBtn() {
        var purchaseSection = document.querySelector('[data-purpose="purchase-section"]');
        if (purchaseSection === void 0) return;

        var copyLinkBtn = document.createElement("button");
        copyLinkBtn.textContent="Copy link as Markdown";
        copyLinkBtn.className = "udlite-btn udlite-btn-large udlite-btn-primary udlite-heading-md";
        copyLinkBtn.style.width = "100%";
        copyLinkBtn.onclick = function (evt) {
            var title = document.title;
            var pageUrl = document.URL;

            if (title.endsWith(" | Udemy")) {
                title = title.slice(0, title.indexOf("| Udemy") - 1);
            }

            var mdText = `[${title}](${pageUrl})`;
            navigator.clipboard.writeText(mdText);
        };
        //purchaseSection.appendChild(document.createElement("br"));
        purchaseSection.children[0].appendChild(copyLinkBtn);
        //purchaseSection.appendChild(copyLinkBtn);
        clearInterval(timerID);
    }

    var timerID = setInterval(addCopyLinkBtn, 1000);
})();