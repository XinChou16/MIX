
let uid = 0;

class Dep {
	constructor() {
    this.id = uid++;
		this.subs = [];
	}
	addSub(sub) {
		this.subs.push(sub);
	}
	removeSub(sub) {
		const idx = this.subs.indexOf(sub);
		if (idx > -1) {
			this.subs.splice(idx, 1);
		}
	}
  // 添加订阅者，访问了this.xx
	depend() {
		if (Dep.target) {
			Dep.target.addDep(this);
		}
	}
  // 通知订阅者更新, this.xx 数据更新了
	notify() {
		const subs = this.subs.slice();
		for (let i = 0; i < subs.length; i++) {
			subs[i].update();
		}
	}
}

Dep.target = null;

export default Dep;
