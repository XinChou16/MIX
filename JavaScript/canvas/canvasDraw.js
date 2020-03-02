
class Drawer {
    constructor(domId, x, y) {
        this.initCanvas(domId, x, y);
    }
    /**
     * 初始化画布
     * @param {String} domId canvas id
     * @param {Number} x canvas 的宽度
     * @param {Number} y canvas 的高度
     */
    initCanvas(domId = '', x, y) {
        const canvasEl = this.canvasEl = domId ? document.querySelector(domId) : document.createElement('canvas');
        canvasEl.width = x;
        canvasEl.height = y;
        this.ctx = canvasEl.getContext('2d');
    }
    /**
     * 画圆形
     * @param {Number} x circle 的横坐标
     * @param {Number} y circle 的纵坐标
     * @param {Number} r circle 的半径
     * @param {Number} fillColor circle 填充的颜色
     */
    drawCircle(x, y, r, fillColor) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x + r, y + r, r, 0, 2 * Math.PI, false );
        this.ctx.fillStyle = fillColor;
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    }
    /**
     * 填充背景色
     * @param {String} fillColor 背景色
     */
    drawBg(fillColor) {
        const { width, height } = this.canvasEl;
        this.ctx.save();
        this.ctx.fillStyle = fillColor;
        this.ctx.fillRect(0, 0, width, height);
        this.ctx.fill();
        this.ctx.restore();
    }
    /**
     * 画图片
     * @param {HTMLImageElement} img 图片
     * @param {Number}} x 横坐标
     * @param {Number}} y 纵坐标
     * @param {Number} w 宽度
     * @param {Number} h 高度
     */
    drawImg(img, x, y, w, h) {
        const arcX = x + w / 2;
        const arcY = y + w / 2;
        const r = w / 2;
        
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(arcX, arcY, r, 0, 2 * Math.PI, false);
        this.ctx.clip();
        this.ctx.drawImage(img, x, y, w, h);
        this.ctx.closePath();
        this.ctx.restore();
    }
    drawCircleImg(img, x, y, r) {
        this.drawImg(img, x, y, r, r);
    }
}
