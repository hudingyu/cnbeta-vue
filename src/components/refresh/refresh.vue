<template>
    <div v-show="visible" class="refresh-btn" @click="onClick">
        <div class="refresh-icon" :class="{'loading-icon': loading}"></div>
    </div>
</template>
<script>
    import Bus from '../../lib/bus';

    export default {
        name: 'Refresh',
        data() {
            return {
                visible: false,
                loading: false,
            };
        },
        methods: {
            onClick() {
                if (!this.loading) {
                    this.loading = true;
                    Bus.$emit('onRefresh');
                }
            },
        },
    }
</script>
<style lang="less">
    .refresh-btn {
        position: fixed;
        bottom: 5%;
        right: 5%;
        width: 30px;
        height: 30px;
        border: 1px solid #ffffff;
        border-radius: 25px;
        background: #ffffff;
        box-shadow: 0px 0px 10px #cccccc;
        cursor: pointer;
        .refresh-icon {
            width: 20px;
            height: 20px;
            position: absolute;
            top: 50%;
            left: 50%;
            /*-webkit-transform: translate(-50%, -50%);*/
            /*transform: translate(-50%, -50%);*/
            margin-left: -10px;
            margin-top: -10px;
            background: url('../../assets/clockwise-arrow.png') no-repeat;
            background-size: 100% 100%;
            &.loading-icon {
                -webkit-animation: rotate 1s linear 0s infinite;
                -moz-animation: rotate 1s linear 0s infinite;
                -o-animation: rotate 1s linear 0s infinite;;
                animation: rotate 1s linear 0s infinite;;
            }
        }
    }
    @media (prefers-color-scheme: dark) {
        .refresh-btn {
            background: #666;
            border: 1px solid #666;
            box-shadow: 0px 0px 10px #777;
        }
    }
    @-webkit-keyframes rotate {
        from {
            -webkit-transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(360deg);
        }
    }
    @-moz-keyframes rotate {
        from {
            -moz-transform: rotate(0deg);
        }
        to {
            -moz-transform: rotate(360deg);
        }
    }
    @-o-keyframes rotate {
        from {
            -o-transform: rotate(0deg);
        }
        to {
            -o-transform: rotate(360deg);
        }
    }
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
