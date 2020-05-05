var app = angular.module('myApp', []);
app.controller("appController", function($scope, $http, $filter) {
    $http.get("https://corona.in.com.bd/api/stats").then(
        function successCallback(response) {

            $scope.confirmedToday = response.data.last.confirmed;
            $scope.recoveredToday = response.data.last.recovered;
            $scope.deathsToday = response.data.last.deaths;
            $scope.testedToday = response.data.last.tested;
            $scope.confirmedTotal = response.data.total.confirmed;
            $scope.recoveredTotal = response.data.total.recovered;
            $scope.deathsTotal = response.data.total.deaths;
            $scope.testedTotal = response.data.total.tested;

            $http.get("https://corona.in.com.bd/api/districts").then( function successCallback(res) {
                $scope.getDistrictsData = res.data.data;

                angular.element(document).ready( function () {
                    var dTable = $('#districtData');
                    dTable.DataTable({
                        responsive: true,
                        "lengthMenu": [[15, 30, -1], [15, 30, "All"]],
                    });
                    // $('input[type = search]').on( 'keyup', function () {
                    //     console.log("1");
                    //     dTable.columns( 1 ).search( '^' + this.value, true, false).draw();
                    // } );
                });
            });

            $scope.datetime = response.data.lastUpdate;
            //$scope.lastUpdateData = $scope.datetime.replace(" ", 'T') + 'Z';
            $scope.lastUpdateData = $scope.datetime;
            $scope.lastData = parseInt($filter('date')($scope.datetime, 'dd'));
            $scope.CurrentDateTime = parseInt($filter('date')(new Date(), 'dd'));
            if($scope.lastData === $scope.CurrentDateTime){
                $scope.text = 'today';
                $scope.Text = 'Today';
            }
            else{
                $scope.text = 'yesterday';
                $scope.Text = 'Yesterday';
            }
        },
        function errorCallback(response){
            console.log("Unable to perform get request");
        }
    );
});