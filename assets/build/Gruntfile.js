module.exports = function(grunt) {
	//util modules
	var path = require('path');

	//paths
	var workDir = '../'; //relative to the current path: /User/wangxin/Desktop/grunt-requirejs/assets/build/
	var srcDir = path.resolve(workDir, './src/');
	var destDire = path.resolve(workDir, './dist/');

	/*============
	 = requirejs =
	 *============
	 */
	var requirejsConfig = {};

	//js libs concat config
	requirejsConfig.libsConcat = {
		options: {
			baseUrl: path.resolve(srcDir, 'js/libs/'),
			paths: {
				'jquery': './jquery',
				'underscore': './underscore',
				'backbone': './backbone'
			},
			optimize: 'uglify',
			findNestedDependencies: true,
			preserveLicenseComments: false,
			include: [
				'jquery',
				'underscore',
				'backbone'
			],
			out: path.resolve(destDire, 'js/libs/base.js'),
			done: function(done, output) {
				var duplicates = require('rjs-build-analysis').duplicates(output);

				if (Object.keys(duplicates).length > 0) {
					grunt.log.subhead('Duplicates found in requirejs build:');
					for (var key in duplicates) {
						grunt.log.error(duplicates[key] + ': ' + key);
					}
					return done(new Error('r.js built duplicate modules, please check the excludes option.'));
				} else {
					grunt.log.success('No duplicates found!');
				}

				done();
			}
		}
	}
	//js app mains concat
	var appMainsArr = [];
	grunt.file.expand({cwd: srcDir}, '**/*-main.js').forEach(function(file, index) {
		var filePath = file.replace(/\.js$/, '');
		
		appMainsArr.push(filePath);

		requirejsConfig['appMainConcat' + index] = {
			options: {
				baseUrl: srcDir,
				name: filePath,
				mainConfigFile: path.resolve(srcDir, 'js/config/requirejs-config.js'),
				optimize: 'uglify',
				findNestedDependencies: true,
				preserveLicenseComments: false,
				exclude: [
					'jquery',
					'underscore',
					'backbone'
				],
				out: path.resolve(destDire, filePath + '.js'),
				done: function(done, output) {
					var duplicates = require('rjs-build-analysis').duplicates(output);

					if (Object.keys(duplicates).length > 0) {
						grunt.log.subhead('Duplicates found in requirejs build:');
						for (var key in duplicates) {
							grunt.log.error(duplicates[key] + ': ' + key);
						}
						return done(new Error('r.js built duplicate modules, please check the excludes option.'));
					} else {
						grunt.log.success('No duplicates found!');
					}

					done();
				}
			}
		}
	});

	grunt.initConfig({
		requirejs: requirejsConfig
	});

	//load tasks
	grunt.loadNpmTasks('grunt-contrib-requirejs');

	//register tasks
	grunt.registerTask('rjs', ['requirejs']);

	//set default entrance
	grunt.registerTask('default', ['rjs']);
};