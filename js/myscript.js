const URL = "https://covid-19.dataflowkit.com/v1";

let app = angular.module("MyApp", []);

app.controller("MyCtrl", ($scope, $http) => {
  $scope.title = "Covid-19 Tracker : Stay Home Stay Safe";

  // $scope.changeValue=()=>{
  //     $scope.title = "This is home time"
  // }

  console.log("App Loaded");

  // calling api

  $http.get(`${URL}/world`).then(
    (response) => {
      // success
      console.log(response.data);

      $scope.all_data = response.data;
      $scope.totalCases = $scope.all_data["Total Cases_text"];
      $scope.recoveredCases = $scope.all_data["Total Recovered_text"];
      $scope.deathCases = $scope.all_data["Total Deaths_text"];

    },
    (error) => {
      // fail
      console.log(error);
    }
  );

  $scope.get_c_data = () => {
    let country = $scope.c;
    $scope.w_data = $scope.all_data;
    if (country == "") {
      $scope.c_data = undefined;
      $scope.w_data = undefined;
      return;
    }
    $http.get(`${URL}/${country}`).then(
      (response) => {
        console.log(response.data);
        $scope.c_data = response.data;
        $scope.totalCasesC = $scope.c_data["Total Cases_text"];
        $scope.recoveredCasesC = $scope.c_data["Total Recovered_text"];
        $scope.deathCasesC = $scope.c_data["Total Deaths_text"];
        $scope.countryName = $scope.c_data["Country_text"]
      },
      (error) => {
        console.log(error);
      }
    );
  };
});
