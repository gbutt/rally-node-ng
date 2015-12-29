angular.module('myApp', ['rally-ng'])

	.directive('myAppCrud', function(){
			return {
				scope: {},
				restrict: 'E',
				templateUrl: './crud.html',
				controller: 'CrudController',
				controllerAs: 'vm'
			};
		}
	)

	.service('CrudService', function(rallyClient, $q, $http) {

		function onError(result) {
			console.log(result);
		}

		this.createDefect = function(){
			console.log('Create...');
			if (rallyClient.isReady()) {

				var data = {
					Name: 'My Defect',
					Environment: 'Test'
				};
				return rallyClient.create('defect', data)
				.then(function(result) {
					console.log('Defect created:', result);
					return result;
				})
				.catch(onError);
			}

			return $q.when(sampleCreateResult);
			
		};

		this.readDefect = function(ref){
			console.log('Read: ', ref);
			if (rallyClient.isReady()) {
				return rallyClient.get(ref, { fetch: 'ObjectID,Name' })
				.then(function(result) {
					console.log('Defect read:', result);
					return result;
				})
				.catch(onError);
			}

			return $q.when(sampleReadResult);
		};

		this.updateDefect = function(ref) {
			console.log('Update: ', ref);
			if (rallyClient.isReady()) {

				var data = {
					Name: 'My Updated Defect'
				};
				return rallyClient.update(ref, data, { fetch: 'Name' })
				.then(function(result) {
					console.log('Defect updated:', result);
					return result;
				})
				.catch(onError);
			}

			return $q.when(sampleUpdateResult);	
		};

		this.deleteDefect = function(ref) {
			console.log('Delete: ', ref);
			if (rallyClient.isReady()) {
				return rallyClient.delete(ref)
				.then(function(result) {
					console.log('Defect deleted:', result);
					return result;
				})
				.catch(onError);
			}
			return $q.when(sampleDeleteResult);
			
		};

		this.getUserInfo = function() {
			if (rallyClient.isReady()) {
				return rallyClient.httpGet({url: '/user:current'});
			}
			return $q.when({UserName: 'Not logged in'});
		}
	})

	.controller('CrudController', function($scope, CrudService) {
		var vm = this;

		vm.create = function(){
			CrudService.createDefect()
			.then(function(createResult){
				$scope.lastOperationResult = createResult;
				vm.ref = createResult.Object._ref;
			});
		};

		vm.read = function(){
			CrudService.readDefect(vm.ref)
			.then(function(readResult){
				$scope.lastOperationResult = readResult;
			});
		};

		vm.update = function(){
			CrudService.updateDefect(vm.ref).then(function(updateResult){
				$scope.lastOperationResult = updateResult;
			});
		};

		vm.del = function(){
			CrudService.deleteDefect(vm.ref)
			.then(function(deleteResult){
				$scope.lastOperationResult = deleteResult;
			});
		};

		vm.pretty = function(obj) {
			return JSON.stringify(obj, null, 2);
		};

		vm.getUserInfo = function() {
			CrudService.getUserInfo().then(function(user){
				$scope.username = user.UserName;
			});
		};

		vm.getUserInfo();

	})

;

var sampleCreateResult = {
		        "Errors": [],
		        "Object": {
		            "Name": "My Defect",
					"Environment": "Test",
		            "ObjectID": 48861114390,
		            "_objectVersion": "1",
		            "_rallyAPIMajor": "2",
		            "_rallyAPIMinor": "0",
		            "_ref": "https://rally1.rallydev.com/slm/webservice/v2.0/defect/48861114390",
		            "_refObjectName": "My Defect",
		            "_refObjectUUID": "fa3bdec5-76f8-4083-be0a-764ead36854d",
		            "_type": "Defect"
		        },
		        "Warnings": [],
		        "_rallyAPIMajor": "2",
		        "_rallyAPIMinor": "0"
			},
	sampleReadResult = {
		        "Errors": [],
		        "Object": {
		            "Name": "My Defect",
		            "ObjectID": 48861114390,
		            "_objectVersion": "1",
		            "_rallyAPIMajor": "2",
		            "_rallyAPIMinor": "0",
		            "_ref": "https://rally1.rallydev.com/slm/webservice/v2.0/defect/48861114390",
		            "_refObjectName": "My Defect",
		            "_refObjectUUID": "fa3bdec5-76f8-4083-be0a-764ead36854d",
		            "_type": "Defect"
		        },
		        "Warnings": [],
		        "_rallyAPIMajor": "2",
		        "_rallyAPIMinor": "0"
			},
	sampleUpdateResult = {
		        "Errors": [],
		        "Object": {
		            "Name": "My Updated Defect",
		            "_objectVersion": "2",
		            "_rallyAPIMajor": "2",
		            "_rallyAPIMinor": "0",
		            "_ref": "https://rally1.rallydev.com/slm/webservice/v2.0/defect/48861114390",
		            "_refObjectName": "My Updated Defect",
		            "_refObjectUUID": "fa3bdec5-76f8-4083-be0a-764ead36854d",
		            "_type": "Defect"
		        },
		        "Warnings": [],
		        "_rallyAPIMajor": "2",
		        "_rallyAPIMinor": "0"
			},
	sampleDeleteResult = {
		        "Errors": [],
		        "Warnings": [],
		        "_rallyAPIMajor": "2",
		        "_rallyAPIMinor": "0"
			};