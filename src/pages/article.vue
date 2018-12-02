<template>
    <div class="cnbeta-article-container">
        <h1 v-html="info.title"></h1>
        <div class="source" v-html="info.source"></div>
        <div class="editor">{{info.author}}</div>
        <div class="time">{{info.pubTime}}</div>
        <div class="hairline"></div>
        <summary v-html="info.summary"></summary>
        <div class="content" v-html="info.content"></div>
    </div>
</template>
<script>
    import { Ajax } from '@/lib/utils';
    function handleVideos() {
        var embeds = document.getElementsByTagName('embed');
        for (var i = embeds.length - 1; i >= 0; i--) {
            var embed = embeds[i];
            var src = embed.src;

            if (src.indexOf('youku.com') > -1) {
                var m = src.match(/sid\/(\w+)/i);
                if (m) {
                    var id = m[1];
                    var iframe = document.createElement('iframe');
                    var m3u8 = 'http://player.youku.com/embed/' + id;
                    iframe.src = m3u8;
                    embed.parentNode.replaceChild(iframe, embed)
                } else {
                    var div = createVideoPlaceholder();
                    embed.parentNode.replaceChild(div, embed)
                }
            } else if (src.indexOf('qq.com') > -1) {
                var m = src.match(/vid=(\S*)&/i);
                if (m) {
                    var id = m[1];
                    var iframe = document.createElement('iframe');
                    var m3u8 = 'https://v.qq.com/iframe/player.html?vid=' + id + '&tiny=0&auto=0';
                    iframe.src = m3u8;
                    embed.parentNode.replaceChild(iframe, embed)
                } else {
                    var div = createVideoPlaceholder();
                    embed.parentNode.replaceChild(div, embed)
                }
            } else if (src.indexOf('qiyi.com') > -1) {
                var m = src.match(/com\/(\S*?)\/0/i);
                var n = src.match(/tvId=(\S*?)-/i);
                if (m) {
                    var vid = m[1];
                    var tvid = n[1];
                    var iframe = document.createElement('iframe');
                    var m3u8 = 'http://open.iqiyi.com/developer/player_js/coopPlayerIndex.html?vid=' + vid +'&tvId=' + tvid + '&accessToken=2.f22860a2479ad60d8da7697274de9346&appKey=3955c3425820435e86d0f4cdfe56f5e7&appId=1368&height=100%&width=100%';
                    iframe.src = m3u8;
                    embed.parentNode.replaceChild(iframe, embed)
                } else {
                    var div = createVideoPlaceholder();
                    embed.parentNode.replaceChild(div, embed)
                }
            } else if (src.indexOf('letv.com') > -1){
                var flashvars = embed.getAttribute("flashvars");
                var m = flashvars.match(/uu=(\S*?)&/i);
                var n = flashvars.match(/vu=(\S*?)&/i);
                if (1) {
                    var uu = m[1];
                    var vu = n[1];
                    var iframe = document.createElement('iframe');
                    var m3u8 = 'http://yuntv.letv.com/bcloud.html?uu=' + uu + '&vu=' + vu + '&auto_play=0&width=320&height=240&lang=zh_CN';
                    iframe.src = m3u8;
                    embed.parentNode.replaceChild(iframe, embed)
                }
            } else {
                var div = createVideoPlaceholder();
                embed.parentNode.replaceChild(div, embed)
            }
        }

        var iframes = document.getElementsByTagName('iframe');
        for (var i = iframes.length - 1; i >= 0; i--) {
            var embed = iframes[i];
            var src = embed.src;
            if (src) {
                if (src.indexOf('qq.com') > -1) {
                    var m = src.match(/vid=(\S*?)&/i)
                    var id = m[1];
                    var m3u8 = 'https://v.qq.com/iframe/player.html?vid=' + id + '&tiny=0&auto=0';
                    src = m3u8;
                }
                var iframe = document.createElement('iframe');
                iframe.src = src;
                iframe.frameborder = 0;
                embed.parentNode.replaceChild(iframe, embed)
            } else {
                var div = createVideoPlaceholder();
                embed.parentNode.replaceChild(div, embed)
            }
        }

        function createVideoPlaceholder() {
            var div = document.createElement('div');
            div.class = 'videoPlaceholder';
            var forbidden = document.createElement('div');
            forbidden.class = 'videoForbidden';
            div.appendChild(forbidden);
            return div;
        }
    }
    export default {
        name: 'cnbeta-article',
        data() {
            return {
                info: {},
            };
        },
        methods: {
            getArticleContent() {
                const sid = [...location.href.split('/')].pop();
                Ajax.get({
                    url: `article/${sid}`,
                    success: (res) => {
                        if (res.code.toString() === '200') {
                            this.info = res.result[0];
                            this.$nextTick(handleVideos);
                        } else {
                            this.$toast({
                                text: '请求出错',
                                duration: 2000,
                            });
                        }
                    },
                    error: () => {
                        this.$toast({
                            text: '网络错误！',
                            duration: 2000,
                        });
                    }
                });
            },

        },
        mounted() {
            this.getArticleContent();
        },
    };
</script>
<style lang="less">

    .cnbeta-article-container {
        word-break: break-all;
        font-family: HelveticaNeue;
        padding:5px 10px;
        margin: auto;
        max-width: 1280px;
        color: #333;
    }
    @media only screen and (min-device-width : 640px) and (max-device-width : 1024px) {
        html {
            font-size: 78%;
        }
        body {
            padding: 5px 70px;
        }
    }
    @media screen and (max-device-width: 640px) {
        html {
            font-size: 2.666667vw;
        }
    }
    h1 {
        margin-top: 5px;
        margin-bottom: 5px;
        display: block;
        font-size: 1.8em;
        -webkit-margin-before: 0.67em;
        -webkit-margin-after: 0.67em;
        -webkit-margin-start: 0px;
        -webkit-margin-end: 0px;
        font-weight: bold;
    }
    .source, .editor, .time {
        text-align: right;
        font-size: 12px;
        color: #666;
    }
    hr {
        border-bottom: 1px solid #3264c8;
        display: block;
        unicode-bidi: isolate;
        -webkit-margin-before: 0.5em;
        -webkit-margin-after: 0.5em;
        -webkit-margin-start: auto;
        -webkit-margin-end: auto;
        overflow: hidden;
        visibility: visible;
    }
    .hairline {
        border-bottom: 1px solid #999999;
        -webkit-margin-before: 1em;
        -webkit-margin-after: 1em;
        -webkit-margin-start: auto;
        -webkit-margin-end: auto;
    }
    summary, .content {
        font-size: 1.6rem;
        text-align: justify;
    }
    summary {
        font-size: 1.5rem;
        padding: 5px;
        background: #f0f0f0;
        border: 0.5px solid #aaaaaa;
    }
    img, video, object, figure, iframe {
        max-width: 100%;
        display: block;
        margin: auto;
    }
    iframe {
        border: none;
    }
    a:link {
        color: rgb(50, 100, 200);
    }
    p {
        display: block;
        -webkit-margin-before: 1em;
        -webkit-margin-after: 1em;
        -webkit-margin-start: 0px;
        -webkit-margin-end: 0px;
    }
    div.videoPlaceholder {
        margin: auto;
        width: 480px;
        height:240px;
        background-color: black;
        position: relative;
    }
</style>
