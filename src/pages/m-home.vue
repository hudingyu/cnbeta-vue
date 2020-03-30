<template>
    <div class="page-content">
        <div class="article-list">
            <phone-cell v-for="item in articleList" :info="item" :key="item.sid" :showSummary="!isMobile"></phone-cell>
        </div>
        <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading" spinner="bubbles"></infinite-loading>
    </div>
</template>
<script>
    import * as _ from 'underscore';
    import InfiniteLoading from 'vue-infinite-loading';
    import PhoneCell from '../components/home-page/phone-cell.vue';
    import Bus from '../lib/bus';
    import { Ajax, getBrowserVersion } from '@/lib/utils';
    export default {
        name: 'Home',
        data() {
            return {
                articleList: [],
                paginationInfo: {
                    current_page: 1,
                    total_page: 0,
                    page_size: 35
                },
                selectedPage: 1,
                refreshBtn: null,
                isMobile: false
            };
        },
        components: {
            InfiniteLoading,
            PhoneCell,
        },
        methods: {
            onInfinite() {
                this.selectedPage = this.selectedPage + 1;
                this.getArticleList().then(
                    () => {
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                    }
                ).catch(
                    err => {
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                    }
                )
            },
            getArticleList(pn) {
                const lastArticle = this.articleList[this.articleList.length - 1];
                // console.log(JSON.stringify(lastArticle));
                return new Promise(
                    (resolve, reject) => {
                        Ajax.get({
                            url: 'timeline',
                            params: {
                                last_sid: this.articleList.length ? lastArticle.sid : 0,
                            },
                            success: (res) => {
                                this.refreshBtn && this.refreshBtn.$stopLoading();
                                if (res.status_code.toString() === '200') {
                                    this.articleList = [...this.articleList, ...res.result];
                                    this.paginationInfo = res.result.pagination;
                                } else {
                                    this.$toast({
                                        text: '请求出错',
                                        duration: 2000,
                                    });
                                }
                                resolve()
                            },
                            error: () => {
                                this.refreshBtn && this.refreshBtn.$stopLoading();
                                this.$toast({
                                    text: '网络错误！',
                                    duration: 2000,
                                });
                                reject()
                            }
                        });
                    }
                )
            },
        },
        mounted() {
            const browser = {
                versions: getBrowserVersion(),
                language: (navigator.browserLanguage || navigator.language).toLowerCase(),
            };

            // 移动端隐藏下载按钮
            if (browser.versions.mobile || browser.versions.ios || browser.versions.android ||
                browser.versions.iPhone || browser.versions.iPad) {
                this.isMobile = true;
            }
//            const fontSize = document.body.clientWidth >= 640 ? '75%' : `${8/3}vw`;
//            document.querySelector('html').setAttribute('style', `font-size: ${fontSize}`);
            if (this.isMobile) {
                this.refreshBtn = this.$showRefresh();
                Bus.$on('onRefresh', () => {
                    document.documentElement.scrollTop = 0;
                    this.selectedPage = 1;
                    this.articleList = [];
                    this.getArticleList();
                });
            }
            
            // this.getArticleList();
        },
        activated() {
            if (this.refreshBtn) {
                this.refreshBtn.$appear();
            }
            // document.body.onscroll = _.throttle(() => {
            //     const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            //     if (scrollTop + document.body.offsetHeight >= document.body.scrollHeight) {
            //         this.selectedPage = this.selectedPage + 1;
            //         this.getArticleList();
            //     }
            // }, 500);
        },
        deactivated() {
            if (this.refreshBtn) {
                this.refreshBtn.$disappear();
            }
            // document.body.onscroll = null;
        },
        beforeDestroy() {
            if (this.refreshBtn) {
                this.refreshBtn.$remove();
                Bus.$off('onRefresh');
            }
        },
    };
</script>
<style lang="less">
    @media only screen and (min-device-width: 640px) {
        html {
            font-size: 78%;
        }
    }
    @media only screen and (max-device-width: 640px) {
        html {
            font-size: 2.666667vw;
        }
    }

    body {
        margin: 0;
        height: 100vh;
        overflow: auto;
    }
    .page-content {
        position: relative;
        padding: 0 1.5rem;
        // background: #fff;
        // height: 100vh;
        // overflow: auto;
        .article-list {
            border: 1px solid transparent;
        }
    }
    
</style>
