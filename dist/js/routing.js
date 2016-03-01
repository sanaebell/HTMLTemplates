
var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider.when('/Users', {
				templateUrl : 'partials/users.html',
				controller  : 'TableCtrl'
				})
  				.when('/AddUser', {
				templateUrl : 'partials/addUser.html',
				controller  : 'TableCtrl'
				})
})

app.controller('mainController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
	});

app.controller('aboutController', function($scope) {
		$scope.message = 'Look! I am an about page.';
	});

app.controller('contactController', function($scope) {
		$scope.message = 'Contact us! JK. This is just a demo.';
});

app.service('filteredListService', function () {
     
    
    this.searched = function (valLists,toSearch) {
        return _.filter(valLists, 
        function (i) {
            /* Search Text in all 3 fields */
            return searchUtil(i, toSearch);
        });        
    };
    
    this.paged = function (valLists,pageSize){
        retVal = [];
        for (var i = 0; i < valLists.length; i++) {
            if (i % pageSize === 0) {
                retVal[Math.floor(i / pageSize)] = [valLists[i]];
            } else {
                retVal[Math.floor(i / pageSize)].push(valLists[i]);
            }
        }
        return retVal;
    };
 
});

var TableCtrl = app.controller('TableCtrl', function ($scope, $filter, filteredListService) {
 
    $scope.pageSize = 4;
    $scope.allItems = getDummyData(); 
    $scope.reverse = false;
 
    $scope.resetAll = function () {
        $scope.filteredList = $scope.allItems;
        $scope.searchText = '';
        $scope.currentPage = 0;
        $scope.Header = ['','','','',''];
    }

    $scope.add = function () {

    }

    $scope.search = function () {
        $scope.filteredList = 
       filteredListService.searched($scope.allItems, $scope.searchText);
        
        if ($scope.searchText == '') {
            $scope.filteredList = $scope.allItems;
        }
        $scope.pagination(); 
    }

    // Calculate Total Number of Pages based on Search Result
    $scope.pagination = function () {
        $scope.ItemsByPage = filteredListService.paged( $scope.filteredList, $scope.pageSize );         
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    $scope.firstPage = function () {
        $scope.currentPage = 0;
    };

    $scope.lastPage = function () {
        $scope.currentPage = $scope.ItemsByPage.length - 1;
    };

    $scope.range = function (input, total) {
        var ret = [];
        if (!total) {
            total = input;
            input = 0;
        }
        for (var i = input; i < total; i++) {
            if (i != 0 && i != total - 1) {
                ret.push(i);
            }
        }
        return ret;
    };
    
    $scope.sort = function(sortBy){
        $scope.resetAll();  
        
        $scope.columnToOrder = sortBy; 
             
        //$Filter - Standard Service
        $scope.filteredList = $filter('orderBy')($scope.filteredList, $scope.columnToOrder, $scope.reverse); 

        if($scope.reverse)
             iconName = 'glyphicon glyphicon-chevron-up';
         else
             iconName = 'glyphicon glyphicon-chevron-down';
              
        if(sortBy === 'EmpId')
        {
            $scope.Header[0] = iconName;
        }
        if(sortBy === 'Email')
        {
            $scope.Header[2] = iconName;
        }

        else if(sortBy === 'name')
        {
            $scope.Header[1] = iconName;
        }
        else if(sortBy === 'Role')
        {
            $scope.Header[3] = iconName;
        }
        else 
        {
            $scope.Header[4] = iconName;
        }
         
        $scope.reverse = !$scope.reverse;   
        
        $scope.pagination();    
    };
    
    $scope.sort ('name');  
    
});

TableCtrl.$inject = ['$scope', '$filter','filteredListService'];

function searchUtil(item, toSearch) {
    /* Search Text in all 3 fields */
    return (item.name.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.Email.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.EmpId == toSearch) ? true : false;
}

function getDummyData() {
    return [
    {
        EmpId: 2,
        name: 'LAAROUSSI BADR-EDDINE',
        Email: 'badreddinelaaroussi@gmail.com',
        Phone: '0622439807',
        Role: 'STAGIARE'
    },
    {
        EmpId: 1,
        name: 'BELLOUTI SANAE',
        Email: 'sanaeBellouti@gmail.com',
        Phone: '0000000000',
        Role: 'STAGIARE'
    }, 
    {
        EmpId: 3,
        name: 'DISSI MUSTAPHA',
        Email: 'dissimustaphe@gmail.com',
        Phone: '111111111',
        Role: 'STAGIARE'
    }, 
    {
        EmpId: 4,
        name: 'OULAIKA AYOUB',
        Email: 'OULAIKAAYOUB@gmail.com',
        Phone: '2222222222',
        Role: 'STAGIARE'        
    },
        {
        EmpId: 2,
        name: 'LAAROUSSI BADR-EDDINE',
        Email: 'badreddinelaaroussi@gmail.com',
        Phone: '0622439807',
        Role: 'STAGIARE'
    },
    {
        EmpId: 1,
        name: 'BELLOUTI SANAE',
        Email: 'sanaeBellouti@gmail.com',
        Phone: '0000000000',
        Role: 'STAGIARE'
    }, 
    {
        EmpId: 3,
        name: 'DISSI MUSTAPHA',
        Email: 'dissimustaphe@gmail.com',
        Phone: '111111111',
        Role: 'STAGIARE'
    }, 
    {
        EmpId: 4,
        name: 'OULAIKA AYOUB',
        Email: 'OULAIKAAYOUB@gmail.com',
        Phone: '2222222222',
        Role: 'STAGIARE'        
    },
            {
        EmpId: 2,
        name: 'LAAROUSSI BADR-EDDINE',
        Email: 'badreddinelaaroussi@gmail.com',
        Phone: '0622439807',
        Role: 'STAGIARE'
    },
    {
        EmpId: 1,
        name: 'BELLOUTI SANAE',
        Email: 'sanaeBellouti@gmail.com',
        Phone: '0000000000',
        Role: 'STAGIARE'
    }, 
    {
        EmpId: 3,
        name: 'DISSI MUSTAPHA',
        Email: 'dissimustaphe@gmail.com',
        Phone: '111111111',
        Role: 'STAGIARE'
    }, 
    {
        EmpId: 4,
        name: 'OULAIKA AYOUB',
        Email: 'OULAIKAAYOUB@gmail.com',
        Phone: '2222222222',
        Role: 'STAGIARE'        
    }
    ];
}