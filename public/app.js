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
                    active: $scope.active,
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
                    question10: $scope.question10,
                    question01A: $scope.question01A,
                    question01B: $scope.question01B,
                    question01C: $scope.question01C,
                    question01D: $scope.question01D,
                    question02A: $scope.question02A,
                    question02B: $scope.question02B,
                    question02C: $scope.question02C,
                    question02D: $scope.question02D,
                    question03A: $scope.question03A,
                    question03B: $scope.question03B,
                    question03C: $scope.question03C,
                    question03D: $scope.question03D,
                    question04A: $scope.question04A,
                    question04B: $scope.question04B,
                    question04C: $scope.question04C,
                    question04D: $scope.question04D,
                    question05A: $scope.question05A,
                    question05B: $scope.question05B,
                    question05C: $scope.question05C,
                    question05D: $scope.question05D,
                    question06A: $scope.question06A,
                    question06B: $scope.question06B,
                    question06C: $scope.question06C,
                    question06D: $scope.question06D,
                    question07A: $scope.question07A,
                    question07B: $scope.question07B,
                    question07C: $scope.question07C,
                    question07D: $scope.question07D,
                    question08A: $scope.question08A,
                    question08B: $scope.question08B,
                    question08C: $scope.question08C,
                    question08D: $scope.question08D,
                    question09A: $scope.question09A,
                    question09B: $scope.question09B,
                    question09C: $scope.question09C,
                    question09D: $scope.question09D,
                    question10A: $scope.question10A,
                    question10B: $scope.question10B,
                    question10C: $scope.question10C,
                    question10D: $scope.question10D,
                });
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