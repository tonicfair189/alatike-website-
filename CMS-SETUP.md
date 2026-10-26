# Alatike property listings CMS

The `/admin/` page uses Decap CMS. Property records are stored in `content/properties.json`; uploaded photos are saved in `images/uploads/`. The homepage reads published records from the JSON file.

## One-time publishing setup

The CMS is configured for `tonicfair189/alatike-website-` on its `main` branch. The current local folder is not a Git checkout, so these changes still need to be added to that GitHub repository.

1. Add the contents of this local project folder to the existing GitHub repository and push them to its `main` branch.
2. In Netlify, connect the existing Alatike project to that repository so commits deploy the site.
3. Create a GitHub OAuth app with the callback URL `https://api.netlify.com/auth/done`, then add its client ID and secret in the Netlify project's OAuth provider settings.
4. Confirm the CMS configuration points at the correct GitHub repository and branch.
5. Deploy the project. Open `/admin/` on the deployed website and sign in with a GitHub account that has write access to the repository.

Keep OAuth client secrets in Netlify settings; never put them in this folder. For reference, see the [Decap GitHub backend guide](https://decapcms.org/docs/github-backend/) and [Netlify OAuth provider guide](https://docs.netlify.com/manage/security/secure-access-to-sites/oauth-provider-tokens/).