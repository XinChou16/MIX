
exports.checkPhone = function checkPhone(phone) {
    return /^1(3|5|6|7|8|9)\d{9}$/.test(phone);
}
