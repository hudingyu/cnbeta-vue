<template>
    <div class="cnbeta-article-container">
        <h1 v-html="info.title"></h1>
        <div class="source" v-html="info.source"></div>
        <div class="editor">{{info.author}}</div>
        <div class="time">{{info.pubTime}}</div>
        <hr class="hairline" />
        <summary v-html="info.summary"></summary>
        <div class="content" v-html="info.content"></div>
    </div>
</template>
<script>
    import { Ajax } from '@/lib/utils';

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
        padding:5px;
        margin: auto;
        max-width: 1280px;
    }
    @media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
        body {
            padding: 5px 70px;
        }
    }
    h1 {
        margin-top: 5px;
        margin-bottom: 5px;
    }gst
    .source, .editor, .time {
        text-align: right;
        font-size: 12px;
    }
    hr {
        border: none;
    }
    hr.hairline {
        border-bottom: 0.5px rgb(50, 100, 200) solid;
    }
    summary, .content {
        text-align: justify;
    }
    summary {
        font-size: 12px;
        padding: 2px 2px;
        background: #f0f0f0;
        border: 0.5px solid #e0e0e0;
    }
    img, video, object, figure, iframe {
        max-width: 100%;
        display: block;
        margin: auto;
    }
    a:link {
        color: rgb(50, 100, 200);
    }
</style>
