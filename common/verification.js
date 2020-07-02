function mobileVerification(mobile) {
	let verification = /^[1][3,4,5,7,8][0-9]{9}$/
	return verification.test(mobile)
}
function pwdVerification(password) {
	let verification = /^[a-zA-Z]\w{5,17}$/
	return verification.test(password)
}
module.exports = {
	mobileVerification,
	pwdVerification
}
