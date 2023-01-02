<?php declare(strict_types = 1);

// QM constants:

define( 'QM_COOKIE', '' );
define( 'QM_DB_EXPENSIVE', 1 );
define( 'QM_EDITOR_COOKIE', '' );
define( 'QM_ERROR_FATALS', 1 );

// WP core constants:

define( 'DB_HOST', '' );
define( 'DB_NAME', '' );
define( 'DB_PASSWORD', '' );
define( 'DB_USER', '' );

define( 'SAVEQUERIES', false );
define( 'WP_CONTENT_DIR', '' );
define( 'WP_MEMORY_LIMIT', '' );
define( 'WP_PLUGIN_DIR', '' );
define( 'WPINC', '' );
define( 'WP_DEFAULT_THEME', '' );

define( 'COOKIE_DOMAIN', '' );
define( 'COOKIEHASH', '' );
define( 'COOKIEPATH', '' );

// Third party constants:

define( 'Altis\ROOT_DIR', '' );

// Third party functions:

function members_register_cap_group( string $name, array $args = [] ): void {}

function members_register_cap( string $name, array $args = [] ): void {}

// WPBrowser compatibility:

class_alias(
	'\\Codeception\\Test\\Unit',
	'\\tad\\WPBrowser\\Compat\\Codeception\\Unit'
);
