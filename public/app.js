/// reference path="_reference.ts" />
(function () {
    var mainModuleName = "app";
    var app = angular.module(mainModuleName, ['ngRoute', 'ngResource']);
    //wait until the document loads
    angular.element(document).ready(function () {
        // manually boostrap angular 
        angular.bootstrap(document, [mainModuleName]);
    });
    // Survey Service +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    app.factory('Surveys', ['$resource', function ($resource) {
            return $resource('/surveys/:id', null, {
                'update': { method: 'PUT' }
            });
        }]);
    // Controllers ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    app.controller('SurveyController', ['$scope', 'Surveys', function ($scope, Surveys) {
            $scope.editing = [];
            $scope.creating = false;
            $scope.username = '';
            $scope.userSurveys = [];
            //$scope.questions = [];
            $scope.setUserName = function (userName) {
                $scope.username = userName; //get the username
                $scope.surveys = Surveys.query(function () {
                    $scope.userSurveys = []; // reset the userSurveys array
                    $scope.surveys.forEach(function (survey) {
                        if (survey.username == $scope.username) {
                            $scope.userSurveys.push(survey);
                        }
                    });
                    $scope.surveys = $scope.userSurveys;
                });
            };
            $scope.save = function () {
                if (!$scope.newSurvey || $scope.newSurvey.length < 1) {
                    return;
                }
                $scope.expirydate = new Date($scope.expirydate);
                $scope.startdate = new Date($scope.startdate);
                var survey = new Surveys({
                    name: $scope.newSurvey,
                    username: $scope.username,
                    completed: false,
                    questions: $scope.questions,
                    multiplechoice: $scope.multiplechoice,
                    startdate: $scope.startdate,
                    expirydate: $scope.expirydate,
                    question01: $scope.question01,
                    question02: $scope.question02,
                    question03: $scope.question03,
                    question04: $scope.question04,
                    question05: $scope.question05,
                    question06: $scope.question06,
                    question07: $scope.question07,
                    question08: $scope.question08,
                    question09: $scope.question09,
                    question10: $scope.question10
                });
                console.log($scope.startdate);
                console.log($scope.expirydate);
                survey.$save(function () {
                    $scope.surveys.push(survey);
                    $scope.newSurvey = ''; // clear textbox
                    $scope.questions = '';
                    $scope.multiplechoice = '';
                    $scope.startdate = '';
                    $scope.expirydate = '';
                    $scope.question01 = '';
                    $scope.question02 = '';
                    $scope.question03 = '';
                    $scope.question04 = '';
                    $scope.question05 = '';
                    $scope.question05 = '';
                    $scope.question06 = '';
                    $scope.question07 = '';
                    $scope.question08 = '';
                    $scope.question09 = '';
                    $scope.question10 = '';
                });
            };
            $scope.create = function () {
                $scope.creating = true;
            };
            $scope.createcancel = function () {
                $scope.creating = false;
            };
            $scope.update = function (index) {
                var survey = $scope.surveys[index];
                Surveys.update({ id: survey._id }, survey);
                $scope.editing[index] = false;
            };
            $scope.edit = function (index) {
                $scope.editing[index] = angular.copy($scope.surveys[index]);
            };
            $scope.cancel = function (index) {
                $scope.surveys[index] = angular.copy($scope.editing[index]);
                $scope.editing[index] = false;
            };
            $scope.remove = function (index) {
                var survey = $scope.surveys[index];
                Surveys.remove({ id: survey._id }, function () {
                    $scope.surveys.splice(index, 1);
                });
                $scope.editing[index] = false;
            };
            $scope.remainingSurveys = function () {
                var count = 0;
                angular.forEach($scope.surveys, function (survey) {
                    if ($scope.username == survey.username) {
                        count += survey.completed ? 0 : 1;
                    }
                });
                return count;
            };
            $scope.totalSurveys = function () {
                var count = 0;
                angular.forEach($scope.surveys, function (survey) {
                    if ($scope.username == survey.username) {
                        count++;
                    }
                });
                return count;
            };
        }]);
    app.controller('sdcontroller', ['$scope', '$routeParams', 'Surveys', '$location',
        function ($scope, $routeParams, Surveys, $location) {
            $scope.survey = Surveys.get({ id: $routeParams.id });
            $scope.update = function () {
                Surveys.update({ id: $scope.survey._id }, $scope.survey, function () {
                    $location.url('/');
                });
            };
            $scope.remove = function () {
                Surveys.remove({ id: $scope.survey._id }, function () {
                    $location.url('/');
                });
            };
            $scope.cancel = function () {
                $location.url('/');
            };
        }]);
    // Routes ++++++++++++++++++++++++++++++++++++++++++++++++++++++
    app.config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                templateUrl: '/surveys.html',
                controller: 'SurveyController'
            })
                .when('/:id', {
                templateUrl: '/surveyDetails.html',
                controller: 'sdcontroller'
            });
        }]);
})();
//# sourceMappingURL=app.js.map