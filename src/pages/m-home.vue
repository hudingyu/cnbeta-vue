<template>
    <div class="page-content">
        <div class="article-list">
            <phone-cell v-for="item in articleList" :info="item" :key="item.sid"></phone-cell>
        </div>
    </div>
</template>
<script>
    import * as _ from 'underscore';
    import PhoneCell from '../components/home-page/phone-cell.vue';
    import Bus from '../lib/bus';
    import { Ajax } from '@/lib/utils';
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
            };
        },
        components: {
            PhoneCell,
        },
        methods: {
            getArticleList(pn) {
                Ajax.get({
                    url: 'timeline',
                    params: {
                        page: pn || this.selectedPage,
                    },
                    success: (res) => {
                        this.refreshBtn.$stopLoading();
                        if (res.code.toString() === '200') {
                            this.articleList = [...this.articleList, ...res.result.list];
                            this.paginationInfo = res.result.pagination;
                        } else {
                            this.$toast({
                                text: '请求出错',
                                duration: 2000,
                            });
                        }
                    },
                    error: () => {
                        this.refreshBtn.$stopLoading();
                        this.$toast({
                            text: '网络错误！',
                            duration: 2000,
                        });
                    }
                });
            },
        },
        mounted() {
//            const fontSize = document.body.clientWidth >= 640 ? '75%' : `${8/3}vw`;
//            document.querySelector('html').setAttribute('style', `font-size: ${fontSize}`);

            this.refreshBtn = this.$showRefresh();
            Bus.$on('onRefresh', () => {
                document.documentElement.scrollTop = 0;
                this.selectedPage = 1;
                this.articleList = [];
                this.getArticleList();
            });
            this.getArticleList();
        },
        activated() {
            if (this.refreshBtn) {
                this.refreshBtn.$appear();
            }
            window.onscroll = _.throttle(() => {
                if (document.documentElement.scrollTop + window.screen.height >= document.documentElement.scrollHeight) {
                    this.selectedPage = this.selectedPage + 1;
                    this.getArticleList();
                }
            }, 500);
        },
        deactivated() {
            this.refreshBtn.$disappear();
            window.onscroll = null;
        },
        beforeDestroy() {
            this.refreshBtn.$remove();
            Bus.$off('onRefresh');
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
    }
    .page-content {
        position: relative;
        padding: 0 1.5rem;
    }
</style>
