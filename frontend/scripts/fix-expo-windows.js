#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

if (process.platform !== 'win32') {
  console.log('Not Windows — skipping Expo externals fix.');
  process.exit(0);
}

const target = path.resolve(process.cwd(), 'node_modules', '@expo', 'cli', 'build', 'src', 'start', 'server', 'metro', 'externals.js');

if (!fs.existsSync(target)) {
  console.log('Target file not found:', target);
  process.exit(0);
}

let content = fs.readFileSync(target, 'utf8');

if (content.includes('function sanitizeModuleId(')) {
  console.log('Patch already applied to', target);
  process.exit(0);
}

// Insert sanitize function after METRO_SHIMS_FOLDER declaration
const insertAfter = "const METRO_SHIMS_FOLDER = \".expo/metro/shims\";";
const sanitizeFn = `\nfunction sanitizeModuleId(moduleId) {\n  return process.platform === 'win32' ? moduleId.replace(/:/g, '_') : moduleId;\n}\n`;

if (content.includes(insertAfter)) {
  content = content.replace(insertAfter, insertAfter + sanitizeFn);
} else {
  console.log('Could not find insertion point in externals.js; aborting.');
  process.exit(0);
}

// Replace usages of moduleId in path.join to use sanitizeModuleId
content = content.replace(/path\.join\(projectRoot, METRO_EXTERNALS_FOLDER, moduleId\)/g, "path.join(projectRoot, METRO_EXTERNALS_FOLDER, sanitizeModuleId(moduleId))");
content = content.replace(/_path\.default\.join\(projectRoot, METRO_EXTERNALS_FOLDER, moduleId\)/g, "_path.default.join(projectRoot, METRO_EXTERNALS_FOLDER, sanitizeModuleId(moduleId))");

// Replace getNodeExternalModuleId join
content = content.replace(/_path\.default\.join\(METRO_EXTERNALS_FOLDER, moduleId, "index\.js"\)/g, "_path.default.join(METRO_EXTERNALS_FOLDER, sanitizeModuleId(moduleId), \"index.js\")");

fs.writeFileSync(target, content, 'utf8');
console.log('Applied Windows externals patch to', target);
