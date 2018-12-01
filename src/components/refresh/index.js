/**
 * Created by hudingyu on 2018/11/7.
 */

import Vue from 'vue';
import Refresh from './refresh.vue';

const RefreshConstructor = Vue.extend(Refresh);
export default (options) => {
    const refreshComponent = new RefreshConstructor({
        el: document.createElement('div'),
        data: options || {},
    });
    refreshComponent.visible = true;
    document.body.appendChild(refreshComponent.$el);
    refreshComponent.$stopLoading = () => {
        refreshComponent.loading = false;
    };
    refreshComponent.$disappear = () => {
        refreshComponent.loading = false;
        refreshComponent.visible = false;
    };
    refreshComponent.$appear = () => {
        refreshComponent.visible = true;
    };
    refreshComponent.$remove = () => {
        refreshComponent.$el &&
        refreshComponent.$el.parentNode &&
        refreshComponent.$el.parentNode.removeChild(refreshComponent.$el);
        refreshComponent.$destroy();
    };
    return refreshComponent;
}
