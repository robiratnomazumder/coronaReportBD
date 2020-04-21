var app = angular.module('myApp', []);
app.controller("appController", function($scope, $http) {
    $http.get("https://fastaar.com/api").then(
        function successCallback(response) {
            $scope.confirmedToday = response.data.new.confirmed;
            $scope.recoveredToday = response.data.new.recovered;
            $scope.deathsToday = response.data.new.deaths;
            $scope.testedToday = response.data.new.tested;
            $scope.confirmedTotal = response.data.total.confirmed;
            $scope.recoveredTotal = response.data.total.recovered;
            $scope.deathsTotal = response.data.total.deaths;
            $scope.testedTotal = response.data.total.tested;
            $scope.getDistrictsData = response.data.districts;
            $scope.datetime = response.data.lastUpdate;
            //$scope.lastUpdateData = $scope.datetime.replace(" ", 'T') + 'Z';
            $scope.lastUpdateData = $scope.datetime;

            angular.element(document).ready( function () {
                dTable = $('#districtData');
                dTable.DataTable({
                    responsive: true,
                    "lengthMenu": [[15, 30, -1], [15, 30, "All"]]
                });
            });
        },
        function errorCallback(response){
            console.log("Unable to perform get request");
        }
    );
});