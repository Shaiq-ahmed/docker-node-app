🚀 Part 1: What is Docker doing in the SSH Deployment Script?
This part:

yaml
Copy
Edit
docker pull ...
docker stop ...
docker rm ...
docker run ...
🔍 What's happening:
This is running Docker on your remote dev server (Linux VM or VPS).

It pulls the new image built from GitHub CI and runs it there.

But you said: "I don't have a dev server yet..." → so this section is not needed right now. You're just working locally using Docker Compose (docker-compose.dev.yml).

👷‍♂️ Part 2: Do I need npm run build for TypeScript?
✅ Short Answer:
Yes, if you're using TypeScript, npm run build compiles .ts → .js.

You don't need it for development inside Docker if you're using ts-node or nodemon.

👇 Breakdown:
Environment	Do you need npm run build?	Why?
Dev (local, Docker Compose)	❌ No (only if using ts-node or nodemon)	Saves time, live reload
CI / Testing / Linting	✅ Yes	Ensures code compiles
Production Deployment	✅ Yes	You ship .js, not .ts
✅ Your Dockerfile.dev is good: you're not running npm run build because you're running the dev script (likely using ts-node or nodemon).

🐳 Part 3: Do you need Docker steps in GitHub Actions?
Since you’re not deploying to a dev server yet, and using docker-compose.dev.yml for local dev only:

❌ You don’t need Docker steps in GitHub Actions right now.
BUT if you want to test your Dockerfile or Docker Compose in CI, you can add this later:

yaml
Copy
Edit
- name: Build Docker image
  run: docker-compose -f docker-compose.dev.yml build

- name: Run container (optional)
  run: docker-compose -f docker-compose.dev.yml up -d
⚠️ Use this only if you want to test the docker build pipeline.

Otherwise, your pipeline can skip this until you have an actual deployment process set up.

📜 Part 4: Where do you see logs of these actions?
📍 GitHub Actions UI:
Go to your GitHub repo → Actions tab

Click on the workflow run

You’ll see all steps logged: build, install, test, notify Discord, etc.

🐳 Docker Compose (locally):
If you're using Docker Compose locally:

bash
Copy
Edit
docker-compose -f docker-compose.dev.yml logs -f
Will show you live logs.

✅ TL;DR Summary
Question	Answer
What does the docker pull/run script do?	Deploys your app on a remote server using Docker
I don't have a dev server — do I need it now?	❌ No, you're good with local docker-compose.dev.yml
Should I run npm run build with TypeScript?	✅ In CI or prod, ❌ in dev with ts-node/nodemon
Do I need Docker in GitHub Actions now?	❌ Not unless testing Docker build in CI
Where do logs show?	✅ GitHub Actions tab + docker-compose logs locally
