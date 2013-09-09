/* global gTasks, angular */
"use strict";

gTasks.controller('TasksController', function($scope, taskListFactory) {

	$scope.taskList = taskListFactory();

	$scope.toggleAllCompleted = false;
	$scope.$watch('toggleAllCompleted', function(completionStatus, oldStatus) {
		if (completionStatus !== oldStatus) {
			$scope.taskList.markAllToCompletionStatus(completionStatus);
		}
	});

	$scope.hasTasks = false;
	$scope.incompleteTaskCount = 0;
	$scope.completedTaskCount = 0;
	$scope.hasCompletedTasks = $scope.completedTaskCount > 0;

	$scope.$watch('taskList.entries', function(tasks) {
		$scope.hasTasks = tasks.length > 0;
		$scope.incompleteTaskCount = $scope.taskList.countIncompleteTasks();
		$scope.completedTaskCount = $scope.taskList.entries.length - $scope.incompleteTaskCount;
		$scope.hasCompletedTasks = $scope.completedTaskCount > 0;
	}, true);

	$scope.newTask = {
		title : ''
	};

	$scope.addEntry = function() {
		$scope.taskList.appendTask($scope.newTask.title);
		$scope.newTask.title = '';
	};

	$scope.removeTask = function(task) {
		$scope.taskList.removeTask(task);
	};

	$scope.removeCompletedTasks = function() {
		$scope.taskList.removeAllCompletedTasks();
	};

});