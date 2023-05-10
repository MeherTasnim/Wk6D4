# 1. Checkout to dev and pull changes
git checkout dev
git pull origin dev
# 2. Checkout to feature branch
git checkout -b middleware
# 3. Create src/middleware directory and src/middleware/index.js
mkdir src/middleware
touch src/middleware/index.js
# Go to app.test.js

# 11. Git workflow
git add .
git commit -m "some message"
git push --set-upstream origin middleware