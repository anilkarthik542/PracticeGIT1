# Jenkins CI/CD — install and pipeline setup

This file explains how to run Jenkins (locally on Windows or via Docker) and how to use the included `Jenkinsfile` to run your Playwright tests.

1) Run Jenkins with Docker (recommended)

PowerShell (requires Docker Desktop installed and running):

```powershell
docker run -d --name jenkins \
  -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  jenkins/jenkins:lts
```

- Open http://localhost:8080 and complete initial setup.
- Install recommended plugins and create an admin user.

2) Windows native installer

- Download from https://www.jenkins.io/download/
- Run the Windows installer and follow prompts.
- After install, open http://localhost:8080.

3) Create a Pipeline job using the repository

- In Jenkins, create a New Item -> Pipeline.
- In Pipeline definition choose "Pipeline script from SCM" and point to your Git repo.
- Ensure the repo contains the `Jenkinsfile` (project root) — Jenkins will use it.

4) What the included `Jenkinsfile` does

- Checks out source from SCM.
- Runs `npm ci` to install dependencies.
- Runs Playwright install step (`npx playwright install`).
- Runs tests with reporters `html` and `junit`.
- Archives `playwright-report` artifacts and publishes JUnit XMLs from `test-results/`.

5) Notes for Windows agents

- The `Jenkinsfile` uses `bat` on Windows and `sh` on Unix agents.
- If your Jenkins master runs in a container, run agents with Node available or use Docker agents.

6) Example Docker agent (optional)

If you prefer pipeline steps to run inside a Node container, modify the pipeline to use `agent { docker { image 'node:18-bullseye' } }` and Jenkins will run shell steps inside that container.

7) Helpful tips

- Ensure `npx playwright install` is run once so browsers are present.
- Add a pipeline step to publish `playwright-report/index.html` as a static report (plugin required) or archive the folder.
- For parallel runs or heavier CI, add Jenkins agents (Windows or Linux) with Node and Docker installed.

If you want, I can also:
- Add a GitHub Actions alternative pipeline.
- Adjust `Jenkinsfile` to run inside a Docker `node` image.
