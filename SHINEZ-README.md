# How to release new version 

> [!NOTE]
> I am not an author, i just wrote-down my steps


1. Add upstream repo, if you don't have it, and fetch it
```shell
git remote add upstream https://github.com/facebook/facebook-nodejs-business-sdk
git fetch upstream 
```

2. Merge to master 
```shell
git checkout master 
git merge upstream/main
```

> [!NOTE]
> Do not remove dependencies `dts-gen`, `promise-retry`, `request`, `request-promise` (i have no idea why do we need 3 last, but ts defs generation will not run without them)

3. Publish #1 
```shell
npm install && npm run prepublish && npm publish 
```

4. Install @shinez-io/facebook-nodejs-business-sdk as dependency 🤪
```shell
npm install @shinez-io/facebook-nodejs-business-sdk 
```

5. Generate ts definitions, `dist/index.d.ts` should appear after it:
```shell 
npm run dts
```

6. Remove @shinez-io/facebook-nodejs-business-sdk  from `package.json`.

7. Increase build version in `package.json` and publish again 
```shell
npm publish 
```

