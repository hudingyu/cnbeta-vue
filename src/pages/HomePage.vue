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
    import ArticleCell from '../components/home-page/article-cell.vue';
    import Bus from '../lib/bus';
    import { Ajax } from '@/lib/utils';
    export default {
        name: 'cnbeta-homepage',
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
            Pagination,
            ArticleCell,
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
                        if (res.status_code.toString() === '200') {
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
                        this.refreshBtn.$stopLoading();
                        this.$toast({
                            text: '网络错误！',
                            duration: 2000,
                        });
                    }
                });
            },
            didChangePage(pn) {
                this.selectedPage = pn;
                this.getArticleList();
            },
        },
        mounted() {
            this.getArticleList();
            // this.scrollView = document.getElementsByClassName('article-list')[0];
        },
    };
</script>
<style lang="less">
    @import '@dp/bee-ui/dist/styles/theme/ecom/index.css';
</style>
