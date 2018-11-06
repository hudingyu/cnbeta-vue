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
            };
        },
        components: {
            Pagination,
            ArticleCell,
        },
        methods: {
            getArticleList() {
                Ajax.get({
                    url: 'timeline',
                    params: {
                        page: this.selectedPage,
                    },
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
