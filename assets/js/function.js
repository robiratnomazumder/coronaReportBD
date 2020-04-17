var app = angular.module('myApp', []);
app.controller("appController", function($scope, $http) {
    $http.get("https://fastaar.com/api").then(
        function successCallback(response) {
            $scope.confirmedToday = response.data.today.todayConfirmed;
            $scope.recoveredToday = response.data.today.todayRecovered;
            $scope.deathsToday = response.data.today.todayDeaths;
            $scope.confirmedTotal = response.data.total.confirmed;
            $scope.recoveredTotal = response.data.total.recovered;
            $scope.deathsTotal = response.data.total.deaths;
            $scope.getDistrictsData = response.data.districts;
            $scope.datetime = response.data.lastUpdate;
            $scope.lastUpdateData = $scope.datetime.replace(" ", 'T') + 'Z';
            angular.element(document).ready( function () {
                dTable = $('#districtData');
                dTable.DataTable({
                    "lengthMenu": [[15, 30, -1], [15, 30, "All"]]
                });
            });
        },
        function errorCallback(response){
            console.log("Unable to perform get request");
        }
    );
});