(function () {

    angular.module('app')
        .controller('AllActivitiesController', ['dataService', 'notifier', '$location', 'activities', '$state', '$log', AllActivitiesController]);

    function AllActivitiesController(dataService, notifier, $location, activities, $state, $log) {

        var vm = this;

        vm.selectedMonth = 1; // default to January

        $log.debug($state.current.data);
        $log.debug($state.current.myFoo);

        vm.allActivities = activities;

        vm.search = function () {
            // var classroom_detail_url = '/classrooms/' + vm.selectedClassroom.id + '/detail/' + vm.selectedMonth;
            // $location.url(classroom_detail_url)
            $state.go('classroom_detail', {id: vm.selectedClassroom.id, month: vm.selectedMonth});
        }

        dataService.getAllClassrooms()
            .then(function(classrooms) {
                vm.allClassrooms = classrooms;
                vm.selectedClassroom = classrooms[0];
            })
            .catch(showError);

        // dataService.getAllActivities()
        //     .then(function(activities) {
        //         vm.allActivities = activities;
        //     })
        //     .catch(showError);

        function showError(message) {
            notifier.error(message);
        }

    }

}());