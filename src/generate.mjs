import fs from 'fs';

const dir = './src/schemas';
const files = fs.readdirSync( dir );

for ( const file of files ) {
	const schema = JSON.parse( fs.readFileSync( `${dir}/${file}`, 'utf8' ) );
	const basename = file.split( '.' )[0];

	let output = `<?php declare(strict_types = 1);
/**
 * This file is generated by the generate.mjs script.
 * Do not edit it manually.
 */

/**
 * ${schema.description}
 *
 * @package query-monitor
 */
${schema.$comment ? `\n${schema.$comment}` : ''}
class QM_Data_${schema.title} extends QM_Data {`;

	for ( const key in schema.properties ) {
		const required = schema.required && schema.required.includes( key );
		const prop = schema.properties[key];

		output += `
	/**`;

		const type = mapType( prop, required );

		if ( type.includes( 'array{' ) ) {
			output += `
	 * @phpstan-var ${type}`;
		} else {
			output += `
	 * @var ${type}`;
		}

		output += `
	 */
	public $${key};
`;
	}

	output += `}
`;

	fs.writeFileSync( `./data/${basename}.php`, output );
}

/**
 * @param {object} prop
 * @param {boolean} required
 * @param {number} level
 * @returns {string}
 */
function mapType( prop, required, level = 1 ) {
	const type = ( prop.tsType || prop.type );
	const requiredMarker = required ? '' : '?';
	let returnType = type;

	if ( prop.phpType ) {
		return `${requiredMarker}${prop.phpType}`;
	}

	if ( typeof type == 'object' ) {
		return `${requiredMarker}${ type.map( ( t ) => mapType( t, true, level + 1 ) ).join( '|' ) }`;
	}

	switch ( type ) {
		case 'number':
			returnType = 'int';
			break;
		case 'boolean':
			returnType = 'bool';
			break;
		case 'array':
			if ( prop.items ) {
				returnType = `array<int, ${mapType( prop.items, true, level + 1 )}>`;
			} else {
				returnType = 'array<int, mixed>';
			}
			break;
		case 'object':
			if ( prop.properties ) {
				let type = 'array{';
				for ( const subKey in prop.properties ) {
					const subRequiredMarker = prop.required && prop.required.includes( subKey ) ? '' : '?';
					const sub = prop.properties[subKey];

					type += `
\t *   ${subKey}${subRequiredMarker}: ${mapType( sub, true, level + 1 )},`;
				}
				type += `
\t * }`;
				returnType = type;
			} else if ( prop.additionalProperties?.type ) {
				returnType = `array<string, ${mapType( prop.additionalProperties, true, level + 1 )}>`;
			} else {
				returnType = 'array<string, mixed>';
			}
			break;
		default:
			returnType = type;
			break;
	}

	return `${requiredMarker}${returnType}`;
}
