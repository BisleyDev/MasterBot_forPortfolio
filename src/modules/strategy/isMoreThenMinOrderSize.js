'use strict';

function isMoreThenMinOrderSize(quantity, price) {
	const minOrderSizeBTC = 0.0001;
	const quantityInBTC = minOrderSizeBTC / price;
	return quantity > quantityInBTC ? true : false;
}
module.exports = isMoreThenMinOrderSize;
