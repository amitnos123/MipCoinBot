# MipCoinBot

General Notes
-------------
Change '.config.json' to 'config.json' and insert your token and prefix of your bot.

***

Project Structure
-----------------

data -&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Have files which keep read and write data for the bot to use<br/>
log -&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Keep all the log files<br/>
node_modules -&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Libraries\Modules<br/>
personal_commands -&nbsp;&nbsp;Commands that are only called in dm with the bot<br/>
general_commands -&nbsp;&nbsp;&nbsp;&nbsp;Commands that are called from both the server and from DM<br/>
server_commands -&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Commands that are only called in the server<br/>
resources -&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Keep images and a like<br/>

***

Naming Structure
----------------

### <u>Camel Case</u>
* Variables


### <u>Snake Case</u>
* Functions
* Class name
* Constants in consts module - All should be snake and upper case

***

Function Description
--------------------
Wirting the description before the function definition in the following format([Closure Compiler](https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler) by Google):<br/>
/**<br/>
\* Function Description<br/>
\* @param {type} member - Param Description<br/>
\* @param {type} id - Param Description<br/>
\* .<br/>
\* .<br/>
\* .<br/>
\* @returns {type} - Return Description<br/>
\*/<br/>
<br/>

#### for example:
/**<br/>
\* Return true or false for, if the member is allowed to use the command. Used for commands which are called through DM<br/>
\* @param {GuildMember} member - The guild member which want to use the command<br/>
\* @param {string} id - id of the command<br/>
\* @returns {boolean} - Is the member is allowed to use the command<br/>
\*/<br/>
<br/>

***

Project's Modules
-----------------
### <u>consts</u>
#### Directory - \node_modules\constants
#### Description
Freeze object which hold the project's global constants.</br>
To use it, request it as any other module and it as an object which is property is a constant. </br>
Every constant should be snake and upper case.
</br>

### <u>log_writer</u>
#### Directory - \node_modules\log_writer
#### Description
Object which write the log, to a givin directory.</br>
The log file is the current date. As a resulat, it changes each day.</br>
The log inside will have a time which was written.
</br>

### <u>data_manager</u>
#### Directory - \node_modules\data_manager
#### Description
Object to extend from for objects that are using JSONs files to save the data for long term.
</br>

### <u>authorization_command_manager</u>
#### Directory - \node_modules\authorization_command_manager
#### Description
Object which manage the authorization for the commands. </br>
That's include authorization settings. Can construct authorization_settings object to manage the settings.
</br>

### <u>stat_manager</u>
#### Directory - \node_modules\stat_manager
#### Description

</br>

### <u>items_manager</u>
#### Directory - \node_modules\items_manager
#### Description

</br>

### <u>statuses_manager</u>
#### Directory - \node_modules\statuses_manager
#### Description

### <u>actions_manager</u>
#### Directory - \node_modules\statuses_manager
#### Description


***

Template For Command's Help 
---------------------------

<pre>
'__Input__' +
'\n' +
input +
'\n\n' +
'__Support Options__' +
'\n' +
options the command support +
'\n\n' +
'__Arguments__' +
description on the arguments
</pre>

#### for example:
<pre>
'__Input__' +
'\n' +
'[fromCharName] [toCharName] [itemName1] [quantity] ... [itemNameN] [quantity]' +
'\n\n' +
'__Support Options__' +
'\n' +
`\`${constants.COMMAND_OPTION_ALL}\`: ${constants.COMMAND_OPTION_ALL_DESCRIPTION}` +
'\n\n' +
'__Arguments__' +
'\n' +
'`[fromCharName]` - The character\'s name which will give the item.' +
'\n' +
'`[toCharName]` - The character\'s name which will get the item.' +
'\n' +
'`[itemName1]` - The item\'s name which will be transfered.' +
'\n' +
'`[quantity]` - How much to transfer from the item which came before it.',
</pre>
