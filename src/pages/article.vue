<template>
    <div class="cnbeta-article-container" v-if="info">
        <h1 v-html="info.title"></h1>
        <div class="news-info">
            <span class="time">{{info.inputtime}}</span>
            <span class="source" v-html="info.source"></span>
        </div>
        <summary v-html="info.summary"></summary>
        <div class="content" v-html="info.content"></div>
        <div class="orign">
            <div>
                <a :href="info.url_show" target="_blank">查看原文</a>
            </div>
        </div>
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
            } else if (src.indexOf('tudou.com') > -1) {
                var m = src.match(/\/v\/(\S*)\/&/i);  //  \S* 匹配多个任意字符
                if (m) {
                    var id = m[1];
                    var iframe = document.createElement('iframe');
                    var m3u8 = 'http://www.tudou.com/programs/view/html5embed.action?code=' + id;
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
                if (m & n) {
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
                if (m && n) {
                    var uu = m[1];
                    var vu = n[1];
                    var iframe = document.createElement('iframe');
                    var m3u8 = 'http://yuntv.letv.com/bcloud.html?uu=' + uu + '&vu=' + vu + '&auto_play=0&width=320&height=240&lang=zh_CN';
                    //var m3u8 = 'http://yuntv.letv.com/bcloud.html?uu=8c224024a0&vu=101dde6582&auto_play=0&width=320&height=240&lang=zh_CN';
                    iframe.src = m3u8;
                    embed.parentNode.replaceChild(iframe, embed)
                }
            }
        }
        
        var iframes = document.getElementsByTagName('iframe');
        for (var i = iframes.length - 1; i >= 0; i--) {
            var embed = iframes[i];
            var src = embed.src;
            if (src) {
                if (src.indexOf('qq.com') > -1) {
                    var m = src.match(/vid=(\S*?)&/i)
                    if (m) {
                        var id = m[1];
                        var m3u8 = 'https://v.qq.com/iframe/player.html?vid=' + id + '&tiny=0&auto=0';
                        src = m3u8;
                    }
                }
                if (src.indexOf('player.youku.com') > -1) {
                    var m = src.match(/embed\/((\S*?)\==)/i);
                    
                    if (m) {
                        var id = m[1];
                        src = 'http://player.youku.com/embed/' + id;
                    }
                }
                if(src.indexOf('http') == -1 && src.indexOf('//') >= 0) {
                    var index = src.indexOf('//');
                    src = 'https:' + src.substr(index);
                }
                var iframe = document.createElement('iframe');
                iframe.src = src;
                iframe.width = document.documentElement.clientWidth;
                iframe.height = document.documentElement.clientWidth/2;
                embed.parentNode.replaceChild(iframe, embed);
            } else {
                var div = createVideoPlaceholder();
                embed.parentNode.replaceChild(div, embed)
            }
        }
        
        var videos = document.getElementsByTagName('video');
        for (var i = videos.length - 1; i >= 0; i--) {
            var video = videos[i];
            var src = video.src;
            if(src.indexOf('http') == -1 && src.indexOf('//') >= 0) {
                var index = src.indexOf('//');
                src = 'https:' + src.substr(index);
            }
            video.src = src;
            video.setAttribute('webkit-playsinline', true);
            video.setAttribute('playsinline', true);
            video.width = document.documentElement.clientWidth;
            video.height = document.documentElement.clientWidth/2;
        }
        
        function createVideoPlaceholder() {
            var div = document.createElement('div');
            div.class = 'videoPlaceholder';
            var forbidden = document.createElement('div');
            forbidden.class = 'videoForbidden';
            div.appendChild(forbidden);
            return div
        }
    }

    export default {
        name: 'cnbeta-article',
        data() {
            return {
                info: null,
            };
        },
        methods: {
            getArticleContent() {
                const sid = [...location.href.split('/')].pop();
                Ajax.get({
                    url: `article/${sid}`,
                    success: (res) => {
                        if (res.status_code.toString() === '200') {
                            this.info = res.result;
                            document.title = this.info.title;
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
    body {
        margin: 0;
    }
    .cnbeta-article-container {
        word-break: break-all;
        font-family: "Lantinghei SC","Open Sans",Arial,"Hiragino Sans GB",STHeiti,"WenQuanYi Micro Hei",SimSun,sans-serif;
        padding:0 1.5rem;
        color: #333;
        border: 1px solid transparent;
        background: #fff;
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
        margin-top: 1rem;
        word-wrap: break-word;
        word-break: break-all;

        font-size: 2em;
        font-weight: bold;
        text-align: left;
        line-height: 1.8;
    }

    .news-info {
        color: #99a2aa;
        margin: 1.2rem 0 2rem 0;
        position: relative;
        font-size: 1.2rem;
        &.source {
            padding: 0 .5rem;
        }
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
        line-height: 1.8;
        text-align: justify;
        word-break: break-all;
    }
    summary {
        padding: 5px;
        background: #f0f0f0;
        /*border: 0.5px solid #aaaaaa;*/
    }
    .content {
        > p {
            margin-bottom: 2rem;
        }
    }
    .orign {
        text-align: center;
        font-size: 12px;
        padding-bottom: 40px;
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
    strong, b {
        font-weight: bold;
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
