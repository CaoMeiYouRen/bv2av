// ==UserScript==
// @name         bv2av
// @namespace    https://www.cmyr.ltd/
// @version      1.1.0
// @description  还原B站的av号
// @author       草梅友仁
// @match        *://*.bilibili.com/*
// @grant        none
// @require      https://s1.hdslb.com/bfs/static/jinkela/long/js/jquery/jquery1.7.2.min.js
// ==/UserScript==

// 算法来源
// 原作者：mcfx
// 链接：https://www.zhihu.com/question/381784377/answer/1099438784
// 来源：知乎
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

// JS版作者：草梅友仁

(function () {
    'use strict';
    const table = 'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF';
    const tr = {};
    for (let i = 0; i < 58; ++i) {
        tr[table[i]] = i;
    }
    const s = [11, 10, 3, 8, 4, 6];
    const xor = 177451812;
    const add = 8728348608;

    /**
     *转换BV到av
     *
     * @author CaoMeiYouRen
     * @date 2020-03-24
     * @param {*} x
     * @returns
     */
    function dec(x) {
        let r = 0;
        for (let i = 0; i < 6; i++) {
            if (typeof tr[x[s[i]]] !== 'undefined') {
                r += tr[x[s[i]]] * 58 ** i;
            }
        }
        return (r - add) ^ xor;
    }

    /**
     * 转换av到bv
     *
     * @author CaoMeiYouRen
     * @date 2020-03-24
     * @param {*} x
     * @returns
     */
    function enc(x) {
        x = (x ^ xor) + add;
        const r = 'BV          '.split('');
        for (let i = 0; i < 10; i++) {
            r[s[i]] = table[Number(x / 58 ** i % 58)];
        }
        return r.join('');
    }
    /**
     *提取BV号
     *
     * @author CaoMeiYouRen
     * @date 2020-03-24
     * @param {*} str
     * @returns
     */
    function getBv(str) {
        if (typeof str !== 'string') {
            return ''
        }
        const res = str.match(/((BV|bv)([A-Za-z0-9]){10,})/);
        return res ? res[1] : '';
    }
    /**
     *替换BV为av号，如果失败则返回原字符串
     *
     * @author CaoMeiYouRen
     * @date 2020-03-24
     * @param {*} str
     * @returns
     */
    function changeBv(str) {
        const bv = getBv(str)
        if (bv) {
            const av = dec(bv)
            if (av) {
                return str.replace(bv, `av${av}`)
            }
        }
        return str
    }
    /**
     *增加当前页面的av号
     *
     * @author CaoMeiYouRen
     * @date 2020-03-24
     */
    function addPageAV() {
        const url = location.href
        const bv = getBv(url)
        if (bv) {
            const av = dec(bv)
            if (av) {
                $('#viewbox_report .video-data:first').append(
                    `<a  href="https://www.bilibili.com/video/av${av}" title="av${av}" target="_blank" style="color: #fb7299 ;margin-left: 20px;">av${av}</a>`
                )
            }
        }
    }

    /**
     *修改页面中全部的bv号
     *
     * @author CaoMeiYouRen
     * @date 2020-03-24
     */
    function changeAllBv() {
        $('a').html((i, oldText) => {
            return changeBv(oldText)
        }).attr('href', (i, oldText) => {
            return changeBv(oldText)
        });
    }

    window.onload = () => {
        setTimeout(() => {
            addPageAV()
            changeAllBv()
            let flag
            let top = 0
            $(window).scroll(() => {
                clearTimeout(flag)
                flag = setTimeout(() => {
                    changeAllBv()
                }, 500);
            })
        }, 5 * 1000);
    }

})();
