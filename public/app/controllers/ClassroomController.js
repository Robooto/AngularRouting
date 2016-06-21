(function () {

    angular.module('app')
        .controller('ClassroomController', ClassroomController);

    ClassroomController.$inject = ['dataService', 'notifier', '$routeParams', '$stateParams'];

    function ClassroomController(dataService, notifier, $routeParams, $stateParams) {

        var vm = this;

        vm.month = /*$routeParams.month*/$stateParams.month;

        vm.message = $stateParams.classroomMessage;

        dataService.getClassroom(/*$routeParams.id*/$stateParams.id)
            .then(function (classroom) {
                vm.currentClassroom = classroom;

                if (/*$routeParams.month*/$stateParams.month) {
                    if (classroom.activities.length > 0 ) {
                        vm.timePeriod = dataService.getMonthName(/*$routeParams.month*/$stateParams.month);
                    } else {
                        vm.timePeriod = 'No activities this month';
                    }
                } else {
                    vm.timePeriod = 'All activities';
                }

            })
            .catch(showError);

        function showError(message) {
            notifier.error(message);
        }

    }

}());