/* This code snippet is setting a global 
variable `__basedir` to the current directory path using `__dirname`. 
It then requires two modules, `web` and `cron`, which are likely JavaScript files
located in the same directory as the current script. 
Requiring these modules will execute their code
and make their functionality available in the current script. */

global.__basedir = __dirname;
require('./web');
require('./cron');
