<template>
    <div class="cell-container" @click="cellClicked">
        <div class="cell-icon" :style="{ background: 'url(' + thumb + ') no-repeat', 'background-size': '100% 100%' }"></div>
        <!--<img class="cell-icon" :src="info.thumb" />-->
        <div class="cell-info">
            <div class="cell-title" v-html="info.title"></div>
            <div class="cell-subtitle" v-html="info.summary"></div>
            <div class="cell-date" v-html="info.inputtime"></div>
        </div>
    </div>

</template>
<script>
    export default {
        props: {
            info: Object,
        },
        data() {
            return {
                thumb: this.info.thumb,
                // thumb: `http://10.4.226.82:8081/data${this.info.thumb}`,
            };
        },
        methods: {
            cellClicked() {
                this.$router.push(`/article/${this.info.sid}`);
            },
        },
    }
</script>
<style lang="less">
    .cell-container {
        min-width: 1024px;
        height: 163px;
        margin: 0 100px;
        border-bottom: 1px solid #D8D8D8;
        display: flex;
        align-items: center;

        &:hover {
            cursor: pointer;
        }

        .cell-icon {
            flex-shrink: 0;
            width: 126px;
            height: 94px;
            box-shadow: 4px 2px 10px rgba(205,205,205,0.30);
        }

        .cell-info {
            margin-left: 29px;
            .cell-title {
                text-align: left;
                height: 25px;
                line-height: 25px;
                font-size: 18px;
                color: #333333;
                white-space: nowrap;
                overflow: hidden;
                -ms-text-overflow: ellipsis;
                text-overflow: ellipsis;
            }

            .cell-subtitle {
                text-align: left;
                margin-top: 8px;
                font-size: 14px;
                color: #666666;
                line-height: 23px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .cell-date {
                text-align: left;
                margin-top: 10px;
                font-size: 14px;
                color: #999999;
            }
        }
    }
</style>
