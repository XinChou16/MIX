
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
	depend() {
		if (Dep.target) {
			Dep.target.addDep(this);
		}
	}
	notify() {
		const subs = this.subs.slice();
		for (let i = 0; i < subs.length; i++) {
			subs[i].update();
		}
	}
}

Dep.target = null;

export default Dep;
