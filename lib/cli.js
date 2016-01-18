#! /usr/bin/env node
"use strict";
var yargs = require('yargs');
var jaydata_dynamic_metadata_1 = require('jaydata-dynamic-metadata');
var fs = require('fs');
var js_beautify_1 = require('js-beautify');
var argv = yargs
    .usage('Usage: jaysvcutil --metadataUri <OData server url>')
    .example('jaysvcutil -m http://services.odata.org/V4/Northwind/Northwind.svc', 'Generate context from Northwind OData service.')
    .describe('m', 'The URI of the OData $metadata definition. Can be an online resource or a local file as well.')
    .describe('o', 'The name of the generated output file. Default is JayDataContext.js.')
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
if (argv.help)
    yargs.showHelp();
else if (!argv.metadataUri) {
    yargs.showHelp();
    console.log('ERROR: The option --metadataUri is mandatory, you must define it.');
}
else {
    var isAssignableTo = function (v) {
        return this.baseTypes.indexOf(v) >= 0;
    };
    var extend = function () {
        return (classes[arguments[0]] = {
            name: arguments[0].split('.').pop(),
            fullName: arguments[0],
            extend: extend,
            isAssignableTo: isAssignableTo,
            baseTypes: (this.baseTypes || []).concat(this)
        });
    };
    var classes = {
        '$data.Entity': {
            name: '$data.Entity',
            extend: extend,
            isAssignableTo: isAssignableTo
        },
        '$data.EntityContext': {
            name: '$data.EntityContext',
            extend: extend,
            isAssignableTo: isAssignableTo
        },
        '$data.Enum': {
            name: '$data.Enum',
            extend: extend,
            isAssignableTo: isAssignableTo
        }
    };
    var dynamicMetadata = new jaydata_dynamic_metadata_1.DynamicMetadata(/* $data mock */ {
        Container: {
            resolveType: function (v) {
                if (typeof v == 'string')
                    return classes[v];
                for (var i in classes) {
                    if (v === classes[i])
                        return v;
                }
            },
            resolveName: function (v) {
                for (var i in classes) {
                    if (v === classes[i] || v === i)
                        return i;
                }
            }
        },
        Entity: classes['$data.Entity'],
        EntityContext: classes['$data.EntityContext'],
        Enum: classes['$data.Enum'],
        createEnum: function () { }
    });
    dynamicMetadata.service(argv.metadataUri, {
        user: argv.userName,
        password: argv.password,
        debug: true,
        autoCreateContext: !argv.autoCreateContext ? undefined : argv.contextInstanceName || 'context',
        namespace: argv.namespace
    }).then(function (factory) {
        var src = js_beautify_1.js_beautify(factory.src);
        if (argv.contextBaseClass)
            src = src.replace(/\$data\.EntityContext/g, argv.contextBaseClass);
        if (argv.entityBaseClass)
            src = src.replace(/\$data\.Entity/g, argv.entityBaseClass);
        if (argv.entitySetBaseClass)
            src = src.replace(/\$data\.EntitySet/g, argv.entitySetBaseClass);
        if (argv.collectionBaseClass)
            src = src.replace(/"Array"/g, '"' + argv.collectionBaseClass + '"');
        var filename = argv.out || 'JayDataContext.js';
        fs.writeFileSync(filename, src, { encoding: 'utf8' });
        console.log('Context file successfully created:', filename);
    }, function (err) {
        console.log(err);
    });
}
//# sourceMappingURL=cli.js.map