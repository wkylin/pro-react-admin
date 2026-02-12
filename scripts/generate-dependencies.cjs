const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const outputPath = path.join(__dirname, '..', 'src', 'data', 'dependencies.json');

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

const dependencies = Object.entries(packageJson.dependencies || {}).map(([name, version]) => ({
  name,
  version,
}));

const devDependencies = Object.entries(packageJson.devDependencies || {}).map(([name, version]) => ({
  name,
  version,
}));

const data = {
  runtime: dependencies,
  dev: devDependencies,
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

console.log('Dependencies data generated at', outputPath);