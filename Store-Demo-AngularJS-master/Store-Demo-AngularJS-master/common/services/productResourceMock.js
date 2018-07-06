(function(){
    'use strict';

    angular.module('productResourceMock', ['ngMockE2E'])

    .run(['$httpBackend', function($httpBackend){

        var products = [
            {
                productId: 16253498,
                name: "iPhone 7",
                description: "Apple's new smartphone boasts it's flagship with a....",
                price: 25,
                rating: 3,
                reviews: 10,
                imgUrl: 'http://placehold.it/320x150'
            },
            {
                productId: 945128,
                name: "Samsung Galaxy S8",
                description: "Samsung reedemed itsef with the new S8...",
                price: 45,
                rating: 5,
                reviews: 7,
                imgUrl: 'http://placehold.it/320x150'
            },
            {
                productId: 478305,
                name: "HP Elite x3",
                description: "The one device that's every device. Now with Wndows 10...",
                price: 55,
                rating: 5,
                reviews: 15,
                imgUrl: 'http://placehold.it/320x150'
            },
            {
                productId: 287156,
                name: "LG G6",
                description: "FillVision 5.7 inch QHD screen...",
                price: 15,
                rating: 4,
                reviews: 9,
                imgUrl: 'http://placehold.it/320x150'
            },
            {
                productId: 497239,
                name: "HTC U Ultra",
                description: "Meet the new 5.7 inch screen liquid surface...",
                price: 65,
                rating: 4,
                reviews: 10,
                imgUrl: 'http://placehold.it/320x150'
            },
            {
                productId: 573562,
                name: "Lumia 950 XL",
                description: "Stunning 5.7 inch Quad HD display and powerful octa-core....",
                price: 71,
                rating: 5,
                reviews: 20,
                imgUrl: 'http://placehold.it/320x150'
            }
        ];

        var productUrl = "#!/main";
        
        $httpBackend.whenGET(productUrl).respond(products);
        var editingRegex = new RegExp(productUrl + "/[0-9][0-9]*", '');
        $httpBackend.whenGET(editingRegex).respond(function(method, url, data){
            var product = {"productId": 0};
            var parameters = url.split('/');
            var length = parameters.length;
            var id = parameters[length - 1];
            if(id > 0){
                for(var i = 0; i < products.length; i++){
                    if(products[i].productId == id){
                        product = products[i];
                        break;
                    }
                }
            }
            return [200, product, {}];

        });
        $httpBackend.whenGET(/app/).passThrough();

    }])

}());