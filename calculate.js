var grandTotal = 0;
var order = 0;
function calculate(next){
	var opts = {
		method: 'GET',      
		headers: {}
	};
	fetch('https://shopee.com.my/api/v4/order/get_order_list?limit=5&list_type=3&offset='+next, opts).then(function (response) {
		return response.json();
	})
	.then(function (body) {
		var next_offset = body.data.next_offset;
		if(next_offset >= 0)
		{
			for (let [key, value] of Object.entries(body.data.details_list)) 
			{
				var totalItem = value.info_card.order_list_cards[0].items.length;

				if(totalItem > 1)
				{
					var counter = 1;
					for (let [key2, value2] of Object.entries(value.info_card.order_list_cards[0].items)) 
					{
						var itemPrice = value2.item_price / 100000;
						var totalItemPrice = value.info_card.final_total / 100000;
						if(counter == totalItem)
						{
							grandTotal += totalItemPrice;
							order++;
							console.log(order + ":", "Price RM " + itemPrice + " - ", value2.name + " Final Total Price : " + totalItemPrice);
						}
						else
						{
							order++;
							console.log(order + ":", "Price RM " + itemPrice + " - ", value2.name + " Final Total Price : ");
						}
						counter++;
					}
				}
				else
				{
					var itemPrice = value.info_card.final_total / 100000;
					grandTotal += itemPrice;
					order++;
	    			console.log(order + ":", "RM " + itemPrice + " - ", value.info_card.order_list_cards[0].items[0].name + " Final Total Price : " + itemPrice);
				}
			}
			calculate(next_offset);
		} 
		else 
		{
			console.log('Calculation completed!');
			console.log('GRAND TOTAL: RM ' + Math.round(grandTotal * 100) / 100);
		}
	});
}
calculate(0);
