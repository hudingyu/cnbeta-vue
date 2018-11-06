<template>
    <div>
        <div class="article-list">
            <article-cell v-for="item in articleList" :info="item" :key="item.sid"></article-cell>
        </div>
        <div class="pagination" v-if="articleList.length">
            <pagination :givenPageCount='paginationInfo.total_page' :givenCurrentPage='Number(paginationInfo.current_page)' :didChangePage='didChangePage'></pagination>
        </div>
    </div>
</template>
<script>
    import { Pagination } from '@dp/bee-ui';
    import ArticleCell from '../components/main-page/article-cell.vue';
    import { Ajax } from '@/lib/utils';
    import axios from 'axios';
    export default {
        name: 'cnbeta-mainpage',
        data() {
            return {
                articleList: [],
                paginationInfo: {
                    current_page: 1,
                    total_page: 0,
                    page_size: 35
                },
                selectedPage: 1,
            };
        },
        components: {
            Pagination,
            ArticleCell,
        },
        methods: {
            getArticleList() {
                const channel = 3;
                const url = 'https://m.cnbeta.com/touch/default/timeline.json';
                const params = {
                    page: this.selectedPage,
                };
                switch (channel) {
                    case 1:
                        /**
                         * Ajax
                         */
                        Ajax.get({
                            url: 'timeline',
//                            url,
                            params,
                            success: (res) => {
                                if (res.code.toString() === '200') {
                                    this.articleList = res.result.list;
                                    this.paginationInfo = res.result.pagination;
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
                        break;
                    case 2:
                        /**
                         * JSONP
                         */
                        this.$jsonp(url, params).then(res => {
                            console.log(res);
                            this.articleList = res.result.list;
                        }).catch(err => {
                            this.$toast({
                                text: err,
                                duration: 2000,
                            });
                        });
                        break;
                    case 3:
                        /**
                         * Node server
                         */
                        axios.get('/newslist', {
                            params
                        }).then(res => {
                            this.articleList = res.data.result.list;
                        });
                        break;
                    case 4:
                        /**
                         * http-proxy-middleware(代理转发)
                         */
                        axios.get('/touch/default/timeline.json', {
                            params
                        }).then(res => {
                            console.log(res);
                            this.articleList = res.data.result.list;
                        });
                        break;
                    default:
                        break;
                }
            },
            didChangePage(pn) {
                this.selectedPage = pn;
                this.getArticleList();
            },
        },
        mounted() {
            this.getArticleList();
        },
    };
</script>
<style lang="less">
    @import '@dp/bee-ui/dist/styles/theme/ecom/index.css';
</style>
