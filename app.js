(
    function(){
    'use strict';

    angular.module('NarrowItDownApp',[])
    .controller('NarrowItDownController',NarrowItDownController)
    .service('MenuSearchService',MenuSearchService)
    .constant('ApiBasePath',"https://davids-restaurant.herokuapp.com")
    .component('foundItems',{
        templateUrl:'itemsList.html',
        controller:myAppComponentCtrl,
        bindings:{
            foundItems:'<',
            onRemove:'&'
        }
    });

    myAppComponentCtrl.$inject = ['$scope', '$element'];
    function myAppComponentCtrl($scope, $element) {
    var $ctrl = this;

    $ctrl.removeItem=function(index){
        $ctrl.foundItems.splice(index,1);
    }

    }



    NarrowItDownController.$inject=['MenuSearchService','$filter','$scope'];
    function NarrowItDownController(MenuSearchService,$filter,$scope){
        var ctrl=this;

        ctrl.onremove=function(index){
            ctrl.listadoMenu.splice(index,1);
        }

        ctrl.getMatchedMenuItems=function(search){
            var MenuSearchServicePromesa = MenuSearchService.getMatchedMenuItems();

            MenuSearchServicePromesa.then(function(response){
                  $scope.msg="";
                if (search==undefined) {
                  $scope.msg="Nothing found";

                }
                else {
                  ctrl.items =$filter('filter')( response.data.menu_items,search);
                  
                  if (ctrl.items.length==0 )
                  {
                    $scope.msg="Nothing found";
                  }

                }
            })
            .catch(function(error){
                console.log(error);
            })
        }

    }

    MenuSearchService.$inject=['$http','ApiBasePath'];
    function MenuSearchService($http,ApiBasePath){
        var service=this;

        service.getMatchedMenuItems=function(){
            var response = $http({
                method:"GET",
                url:(ApiBasePath + "/menu_items.json")
            });

            return response;
        };
    }


})();
