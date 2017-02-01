#!/usr/bin/env node

import * as yargs from 'yargs';
import { DynamicMetadata, MetadataHandler } from 'jaydata-dynamic-metadata';
import * as fs from 'fs';
import * as js_beautify from 'js-beautify';

var argv = yargs
	.usage('Usage: jaysvcutil --metadataUri <OData server url>')
	.example('jaysvcutil -m http://services.odata.org/V4/Northwind/Northwind.svc', 'Generate context from Northwind OData service.')
	.describe('m', 'The URI of the OData $metadata definition. Can be an online resource or a local file as well.')
	.describe('o', 'The name of the generated output file. Default is JayDataContext.js.')
	.describe('t', 'The name of the generated TypeScript definition file. Default is JayDataContext.d.ts.')
	.describe('n', 'The namespace of the generated JayData EntitContext class. Default is taken from the metadata.')
	.describe('c', 'The name of the base class for the generated entity context. Default is $data.EntityContext.')
	.describe('e', 'The name of the base class for the generated entity types. Default is $data.Entity.')
	.describe('s', 'The name of the base class for the generated entity sets. Default is $data.EntitySet.')
	.describe('a', 'The name of the base class for the generated entity sets. Default is Array.')
	.describe('b', 'Create an instance of the context with default parameters. Default is false.')
	.describe('x', 'The name of the automatically generated context instance under the context namespace. Default is "context".')
	.describe('u', 'The network username for an authenticated OData service.')
	.describe('p', 'The network password for an authenticated OData service.')
	.describe('h', 'Dispaly this help screen.')
	.alias('m', 'metadataUri')
	.alias('o', 'out')
	.alias('t', 'dts')
	.alias('n', 'namespace')
	.alias('c', 'contextBaseClass')
	.alias('e', 'entityBaseClass')
	.alias('s', 'entitySetBaseClass')
	.alias('a', 'collectionBaseClass')
	.alias('b', 'autoCreateContext')
	.alias('x', 'contextInstanceName')
	.alias('u', 'userName')
	.alias('p', 'password')
	.alias('h', 'help')
	.epilog('Copyright (c) 2015 JayStack')
	.wrap(yargs.terminalWidth() - 1)
	.argv;

if (argv.help) yargs.showHelp();
else if (!argv.metadataUri){
	yargs.showHelp();
	console.log('ERROR: The option --metadataUri is mandatory, you must define it.');
}else{
	var process = function(factory){
		var src = js_beautify(factory.src);
		var filename = argv.out || 'JayDataContext.js';
		var dts = argv.dts || 'JayDataContext.d.ts';
		fs.writeFileSync(filename, src, { encoding: 'utf8' });
		console.log('Context file successfully created:', filename);
		fs.writeFileSync(dts, factory.dts, { encoding: 'utf8' });
		console.log('TypeScript definition file successfully created:', dts);
	};

	if (argv.metadataUri.indexOf('http:') == 0 || argv.metadataUri.indexOf('https:') == 0){
	    var dynamicMetadata = new DynamicMetadata({});
		dynamicMetadata.service(argv.metadataUri, {
			user: argv.userName,
			password: argv.password,
			debug: true,
			autoCreateContext: !argv.autoCreateContext ? undefined : argv.contextInstanceName || 'context',
			namespace: argv.namespace,
			contextName: (argv.dts || 'JayDataContext.d.ts').split('.')[0],

            baseType: argv.entityBaseClass,
            entitySetType: argv.entitySetBaseClass,
            contextType: argv.contextBaseClass,
            collectionBaseType: argv.collectionBaseClass,
            generateTypes: false
		}).then(process, function(err){
			console.log(err);
		});
	}else{
		fs.readFile(argv.metadataUri, 'utf8', function(err, text){
			if (err){
				console.log(err.message);
			}else{
				var $metadata:string = text;
				process(new MetadataHandler({}, {
					debug: true,
					autoCreateContext: !argv.autoCreateContext ? undefined : argv.contextInstanceName || 'context',
					namespace: argv.namespace,
					contextName: (argv.dts || 'JayDataContext.d.ts').split('.')[0],

                    baseType: argv.entityBaseClass,
                    entitySetType: argv.entitySetBaseClass,
                    contextType: argv.contextBaseClass,
                    collectionBaseType: argv.collectionBaseClass,
                    generateTypes: false
				}).parse($metadata));
			}
		});

	}
}
