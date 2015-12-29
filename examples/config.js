// a configuration is required to use this library. This config module must be called 'rally-ng.config' and it must contain a constant called 'rallyNgConfig'. 
// this configuration must provide either an api key or a username/password. we also recommend you provide unique x-Rally headers, as they can help our support team troubleshoot any issues you may have. everything else should be left to their defaults.

angular.module('rally-ng.config', [])
	.constant('rallyNgConfig',{
		// // to authenticate, provide an api key. to generate an api key go to https://rally1.rallydev.com/login
		apiKey: apiKey,
		// // if you want to use basic authenitcation then you will need to base64 encode it yourself. Check out https://github.com/ninjatronic/angular-base64
		// basicAuthorization: $base64.encode(username+':'+password),
		// // the server url, only specify if different from the default (https://rally1.rallydev.com).
		// server: 'https://rally1.rallydev.com',
		// // the wsapi version to use. This library is designed for v2.0. I don't recommend changing this setting, just use the default.
		// apiVersion: 'v2.0',
		// // if you have more than one workspace you can specify your default workspace here. otherwise all calls will use the default workspace configured on the rally server
		// workspace: {
		// 	ObjectID: ''
		// },
		// if you want to override default options for http callouts, do so here. this is passed directly to angular $http
		http: {
			defaults: {
				headers: {
                    common: {
                        'X-RallyIntegrationLibrary': 'rally-ng v1.0.0',
                        'X-RallyIntegrationName': 'Rally REST Toolkit for Angular - examples',
                        'X-RallyIntegrationVendor': 'Rally Software, Inc.',
                        'X-RallyIntegrationVersion': 'v1.0.0',
                    }
                }
			}
		},
	});

