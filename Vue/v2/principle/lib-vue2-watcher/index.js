import { stateMixin } from './state';

/**
 * Vue
 */
class Vue {
	constructor(opts) {
		console.log('init opts', opts);

		this.$options = opts;
    this._init();
	}
}

stateMixin(Vue);

export default Vue;
