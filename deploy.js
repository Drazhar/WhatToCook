const path = require("path")
const fs = require("fs/promises")

const deployDir = path.resolve("00_deploy")
const distPath = path.resolve("01_frontend", "dist")
const buildPath = path.resolve("02_backend", "build")

const removedDeploy = fs.rmdir(deployDir, { recursive: true })

const buildBackend = fs
  .rmdir(buildPath, { recursive: true })
  .then(() => exec("cd 02_backend && tsc"))

const buildFrontend = fs
  .rmdir(distPath, { recursive: true })
  .then(() => exec("cd 01_frontend && npm run build"))

const backendDeployed = Promise.all([buildBackend, removedDeploy]).then(() =>
  fs.rename(buildPath, deployDir)
)

Promise.all([buildFrontend, backendDeployed]).then(() => {
  fs.rename(distPath, path.join(deployDir, "static"))
})

const filesToCopy = [
  "docker-compose.yml",
  "Dockerfile_node",
  path.join("02_backend", "package.json"),
]
filesToCopy.forEach((filename) => {
  backendDeployed.then(() => {
    fs.copyFile(path.resolve(filename), path.join(deployDir, path.basename(filename)))
  })
})

function exec(cmd) {
  const { exec } = require("child_process")
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      }
      resolve(stdout ? stdout : stderr)
    })
  })
}
