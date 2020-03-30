<template>
    <div class="phone-cell-container" @click="cellClicked">
        <div class="cell-icon" :style="{ background: 'url(' + thumb + ') no-repeat', 'background-size': '100% 100%' }"></div>
        <div class="cell-info">
            <div class="cell-title" v-html="info.title"></div>
            <div v-if="showSummary" class="cell-summary" v-html="info.summary"></div>
            <div class="cell-date" v-html="info.inputtime"></div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'PhoneCell',
        props: {
            info: Object,
            showSummary: Boolean,
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
    .phone-cell-container {
        position: relative;
        margin: 2rem 0;
        width: 100%;
        /*border-bottom: 1px solid #D8D8D8;*/
        /*display: flex;*/
        /*align-items: center;*/

        &:hover {
            cursor: pointer;
        }

        .cell-icon {
            position: relative;
            display: inline-block;
            width: 31.2%;
            border-radius: 2px;
            padding-bottom: 23.4%;
            box-shadow: 4px 2px 10px rgba(205,205,205,0.30);
        }

        .cell-info {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            width: 66%;
            .cell-title {
                font-size: 1.6rem;
                color: #333;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                position: relative;
                word-wrap: break-word;
                word-break: break-all;
            }
            @media (prefers-color-scheme: dark) {
                .cell-title {
                    color: #ccc;
                }
            }
            .cell-summary {
                position: relative;
                word-wrap: break-word;
                word-break: break-all;
                margin-top: 10px;
                color: #99a2aa;
                width: 100%;
                font-size: 1.4rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                /* autoprefixer: off */
                -webkit-box-orient: vertical;
                /* autoprefixer: on */
                word-break: break-all; 
            }
            .cell-date {
                position: absolute;
                bottom: .32rem;
                color: #99a2aa;
                width: 100%;
                font-size: 1.2rem;
            }
        }
    }
</style>
